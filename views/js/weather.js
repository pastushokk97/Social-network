const submit = document.querySelector('.btn');
const temperature = document.querySelector('.temperature');
const feels = document.querySelector('.feels');
const pressure = document.querySelector('.pressure');
const wind = document.querySelector('.wind');
const key = 'c0f40e1efe573f1480fb99acd3c0491f';
const weather = [];
let i = 0;

submit.addEventListener('click',(e) => {
  e.preventDefault();
  
  const city = document.querySelector('.city').value;
  
  if(city.length === 0) {
   return alert('You did not choose a city');
  }

  async function claim() {
    await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c0f40e1efe573f1480fb99acd3c0491f&units=metric`)
    .then(res => res.json())
    .then(data => {
      weather.push(data);
    });

    const dataTemp = Math.round(weather[i].main.temp);
    const dataFeels = Math.round(weather[i].main.feels_like);
    const dataPressure = Math.round(weather[i].main.pressure);
    const dataWind = Math.round(weather[i].wind.speed);

    temperature.innerHTML = `<p>Temperature: ${dataTemp}<sup>0</sup> C</p>`;
    feels.innerHTML = `<p>Feels like: ${dataFeels}<sup>0</sup> C</p>`;
    pressure.innerHTML = `<p>Pressure: ${dataPressure} mm.m.</p>`
    wind.innerHTML = `<p>Wind: ${dataWind} m. per second</p>`
    
    i+=1;
  }
  claim();
});
