import logo from "./logo.svg";
import "./App.css";
import { FormControl, Select, MenuItem } from "@material-ui/core";
import { useState ,useEffect} from "react";
import InfoCard from "./components/InfoCard";

function App() {
  const [countries,setCountries] =useState([]);
  const [country,setCountry]=useState('worldwide');

  //https://disease.sh/v3/covid-19/countries
   useEffect(() => {
     //runs asyn code
     const getCountriesData= async ()=> {
        await fetch('https://disease.sh/v3/covid-19/countries')
        .then((response)=> response.json())
        .then((data)=>{
           const countries = data.map((country)=>{
             return {
                name:country.country,
                value:country.countryInfo.iso2,
             }
           })

           setCountries(countries)
        })
     }

     getCountriesData();
    
   } ,[countries])

   const onCountryChangeHandler= async (event)=>{
          const countryCode= event.target.value;
          console.log(countryCode)
          setCountry(countryCode)
   }  
  return (
    <div className="App">
      <div className="app_header">
        <h1>covid tracker</h1>

        <FormControl>
          <Select variant="outlined" value={country} onChange={onCountryChangeHandler}>
          <MenuItem value="worldwide">worldwide</MenuItem>
            {countries.map((country)=>{
                return  <MenuItem value={country.value}> {country.name}</MenuItem>
            })}
           
          </Select>
        </FormControl>
      </div>

      <div className='app_stats'>
        <InfoCard title={'corona cases'}  cases={12334} total={100} />
        <InfoCard title={'recovered cases'} cases={12334} total={10}/>
        <InfoCard title={'death cases'} cases={12334} total={10}/>

      </div>
    </div>
  );
}

export default App;
