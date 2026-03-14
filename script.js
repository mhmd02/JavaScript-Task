let img = document.getElementById("myImage");
let button = document.getElementById("btn");
let form = document.getElementById("frm");

let lat =  36.8065;
let lon =  2.233334;
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let userLat = document.getElementById("lat");
    let userLong = document.getElementById("long");
    
    console.log(userLat.value);
    console.log(userLong.value);
    lon = parseFloat(userLong.value);
    lat = parseFloat(userLat.value);
    
    let weatherData = await fetchWeather(lat, lon);
    let conditions = await processWeatherData(weatherData);
    await fetchImg(conditions);
    
    button.addEventListener("click", async function(){
    await convertToFahrenheit(weatherData)
    });

});


async function fetchWeather(lat, long) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat}%2C%20${long}?unitGroup=metric&key=DH9A8ZBFQ8T3NACMRJL7ZVH8E&contentType=json`,
  );
  const data = await response.json();
  let currentConditions = data.currentConditions;
  let { temp, icon, conditions } = currentConditions;
  let res = { temp, icon, conditions };
  console.log(res);
  console.log(`Temperature is ${temp} celsius`);
  return res;
}

function processWeatherData(data) {
  let { temp, conditions } = data;
  let color = "";

  if (temp <= 20 && temp > 10) {
    console.log("Cool weather");
    color = "lightblue";
  } else if (temp <= 10 && temp > 0) {
    console.log("Cold weather");
    color = "lightgray";
  } else if (temp <= 0) {
    console.log("Freezing weather");
    color = "white";
  } else {
    console.log("Hot weather");
    color = "orange";
  }
  // to manupiulate background color
  document.body.style.backgroundColor = color;
  return conditions;
}

async function fetchImg(cond) {
  const response = await fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=bvbDKzvAAyKw5jGCAJLm6LqVLN80TnoA&q=${cond.split(",")[0]} weather&limit=1`,
  );
  const data = await response.json();
  img.src = data.data[0].images.original.url;
}

function convertToFahrenheit(data) {
  res = (data.temp * 9) / 5 + 32;
  console.log(`The temperature is ${res} in Fahrenheit`);
  //return res;
}



