import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import styles from "./weathermodule.css";

function Weather() {
    const [toLogin, setToLogin] = useState(false)
    const [zipcode, setZip] = useState('');

    if (toLogin === true) {
        return <Navigate to='/' />
    }

    function checkZip(zip) {
        //this will reset page if you type in another zipcode
        document.getElementById("weatherDetails").innerHTML = ""
        document.getElementById("cityName").innerHTML = "City Name"
        document.getElementById("errMsg").innerHTML = ""
    
           // format for a zipcode
        let properZip = /^\d\d\d\d\d$/
     
        if (properZip.test(zip)) {
           //send for the weather info
            getWeather(zip);	  
        } 
        else {
           //dispay error
            document.getElementById("errMsg").innerHTML = "Invalid Zip Code"
        }
        
     
     
     function getWeather(zipcode) {
        //new request
        let xhr = new XMLHttpRequest();
     
        //onload handler
        xhr.addEventListener("load", responseReceivedHandler);
     
        //open request
        xhr.open("GET", "https://api.openweathermap.org/data/2.5/weather?zip="+ zipcode +",US&units=imperial&appid=6be5ad057d595a50a268e1e8af7b4033");
        
        //set data type of response
        xhr.responseType = 'json';
     
        //send response
        xhr.send();
     }
     
     function responseReceivedHandler() {
        //change city name accordingly
        document.getElementById('cityName').innerHTML = this.response.name
     
        //start the list of weather descriptors
        let html = ""
        document.getElementById("weatherDetails").innerHTML += "<ul>"
     
        html += "<li>Current Temperature: " + this.response.main.temp + "&#8457;</li>"
        html += "<li>Relative Humitity: " + this.response.main.humidity + "%</li>"
        html += "<li>Currently Feels-like: " + this.response.main.feels_like + "&#8457;</li>"
        html += "<li>Current sky: " + this.response.weather[0].description +".</li>"
        html += "<li>High temperature: " + this.response.main.temp_max + "&#8457;</li>"
        html += "<li>Low temperature: " + this.response.main.temp_min + "&#8457;</li>"
     
        //end weather list
        document.getElementById("weatherDetails").innerHTML += html + "</ul>"
     }
    }
    
    return (
        <main className={styles.weather}>
            <body>
                <h1>Weather Lookup</h1>
                <div id="searchBox">
                    <div class="centerInGridRow">
                        <input type="text" id="zip" value={zipcode} onChange={(e) => setZip(e.target.value)} placeholder="zip" required  size="5"/>
                    </div>
                    <div class="centerInGridRow">
                        <button id="getWeatherButton" onClick={() => checkZip(zipcode)}>Find Weather</button>
                    </div>
                    <div id="errMsg" class="error noshow">
                    </div>
                </div>
                <div id="weatherBox">
                    <h3 id="cityName">City Name</h3>
                    <div id="weatherDetails">
                    </div>
                </div>
                <button id="changePage" onClick={() => setToLogin(() => !toLogin)}>
                    Return to Login
                </button>
            </body>
        </main>
    )
}

export default Weather