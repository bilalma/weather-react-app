import { useState } from 'react';
import './App.css';

const api = {
  key: 'a5294dfc0e95cb4069dce78f0fec427c',
  base: 'https://api.openweathermap.org/data/2.5/'
}


function App() {

  const [ search, setSearch ] = useState('');
  // we are getting data from weather so it is the object. 
  const [ weather, setWeather ] = useState({})


  const weatherSearch = evt => {

    if (evt.key === 'Enter') {
      fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result)
          setSearch('')
          console.log(result)
        })
    }
  }

  const dateGenerate = (dd) => {

    let months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    let days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];

    let date = dd.getDate();
    let day = days[ dd.getDay() ];
    let month = months[ dd.getMonth() ]
    let year = dd.getFullYear();

    return `${date} ${day} ${year} ${month}`
  }
  return (
    <div className={
      (typeof weather.main != "undefined" ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app')
    }>
      <main>
        <div className='search-box'>
          <input
            type="text"
            className="search-bar"
            placeholder="search me"
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyPress={weatherSearch}
          />
          {
            typeof weather.main != 'undefined' ? (
              <>
                <div className='location-box'>
                  <div className='location'>{weather.name}, {weather.sys.country}</div>
                  <div> {dateGenerate(new Date())}</div>
                </div>
                <div className='weather-box'>
                  <div className='temp'>
                    {Math.round(weather.main.temp)} °c
                  </div>
                  <div className='weather'>{weather.weather[ 0 ].main}</div>
                </div>
              </>
            ) : ('')
          }

        </div>
      </main>
    </div>
  );
}

export default App;
