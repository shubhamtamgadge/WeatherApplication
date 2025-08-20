

// https://api.openweathermap.org/data/2.5/weather?lat=57&lon=-2.15&appid={API_key}&units=metric

// https://api.openweathermap.org/data/2.5/weather?q=pune&appid=2fcc6c6ba089a0bf1dd2a32a0cd1742d&units=metric

// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API_key}&units=metric

const API_key ="2fcc6c6ba089a0bf1dd2a32a0cd1742d";

const temp = document.querySelector("#temp");
const desc = document.querySelector("#desc");
const currentCity = document.querySelector("#city");
const wind = document.querySelector("#wind");
const humidity = document.querySelector("#humidity");
const cloud = document.querySelector("#cloud");
const searchedCity = document.querySelector("#searchCity");
// const weatherImage = document.getElementById("myImage").src = "images/img1.png";



function renderWeather(data){

    temp.textContent = `${data?.main.temp.toFixed(0)}°C`
    currentCity.textContent = `${data?.name}`
    desc.textContent = `${data.weather[0]?.description}`
    wind.textContent = `${data.wind?.speed} m/s`
   humidity.textContent = `${data.main?.humidity} %`
   cloud.textContent = `${data.clouds?.all} %`
   setImage(`${data?.weather?.[0]?.icon}`);


}

function setImage(imageCode){

    console.log(imageCode);


    if(imageCode === "10d" || imageCode === "10n" || imageCode === "09d" || imageCode === "09n" ){
        document.getElementById("myImage").src = "images/img1.png";
    }
    else if(imageCode === "11d" || imageCode === "11n" ){
       document.getElementById("myImage").src = "images/img17.png";
    }
    else if(imageCode === "13d" || imageCode === "13n" ){
       document.getElementById("myImage").src = "images/img8.png";
    }
    else if(imageCode === "01d" || imageCode === "01n" || imageCode === "02d" || imageCode === "02n"){
       document.getElementById("myImage").src = "images/img21.png";
    }
    else if(imageCode === "09d" || imageCode === "09n"){
       document.getElementById("myImage").src = "images/img25.png";
    }
   
   
}

function getCurrentLocation(){

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(getData);
    }
    else{
        console.log('no geolocation support');
    }

}

async function getData(position){
    let lat = position.coords.latitude;
    let long = position.coords.longitude;

     try{
        const responce = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_key}&units=metric`);

        const data= await responce.json();

        // console.log("weather data" , data);

        renderWeather(data);
    }
    catch(err)
    {
        console.log('Error Found' , err);
    }

 
}

async function fetchWeatherByCity() {
    
    let city = document.getElementById("searchCity").value;

    if(city==="") return;

    try{
        const responce = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`);

        const data= await responce.json();

        console.log("weather data" , data);

        renderWeather(data);

        
    }
    catch(err)
    {
        console.log('Error Found' , err);
    }
   
}


// async function fetchWeatherByLatLong() {
    
//     let lat= '18.491147';
//     let long ='73.819597' ;

//     try{
//         const responce = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_key}&units=metric`);

//         const data= await responce.json();

//         console.log("weather data" , data);

//         renderWeather(data);
//     }
//     catch(err)
//     {
//         console.log('Error Found' , err);
//     }

// }



// showWeather();


window.onload = getCurrentLocation;
