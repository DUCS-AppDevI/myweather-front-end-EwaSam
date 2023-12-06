import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import styles from "./weathermodule.css";

function Weather() {
    const [toLogin, setToLogin] = useState(false);
    const [zipcode, setZip] = useState('');

    useEffect(() => {
        getWeather();
    }, []); // Empty dependency array ensures that the effect runs only once on page load

    async function getWeather() {
        try {
            // Make the API request using fetch
            const response = await fetch("http://127.0.0.1:3010/getWeather");
            
            // Check if the response is successful (status code 200)
            if (!response.ok) {
                throw new Error("Failed to fetch weather data");
            }

            // Parse the JSON response
            const data = await response.json();

            // Call the responseReceivedHandler with the data
            responseReceivedHandler(data);
        } catch (error) {
            console.error("Error fetching weather data:", error.message);
        }
    }

    function responseReceivedHandler(data) {
        //change city name accordingly
        document.getElementById('cityName').innerHTML = data.name;
    
        //start the list of weather descriptors
        let html = "";
        document.getElementById("weatherDetails").innerHTML = "<ul>";
    
        html += "<li>Current Temperature: " + data.main.temp + "&#8457;</li>";
        html += "<li>Relative Humidity: " + data.main.humidity + "%</li>";
        html += "<li>Currently Feels-like: " + data.main.feels_like + "&#8457;</li>";
        html += "<li>Current Sky: " + data.weather[0].description + ".</li>";
        html += "<li>High Temperature: " + data.main.temp_max + "&#8457;</li>";
        html += "<li>Low Temperature: " + data.main.temp_min + "&#8457;</li>";
    
        //end the weather list
        document.getElementById("weatherDetails").innerHTML += html + "</ul>";
    }
    
    if (toLogin === true) {
        return <Navigate to='/' />;
    }
    return (
        <main className={styles.weather}>
            <body>
                <h1>Weather Lookup</h1>
                <div id="searchBox">
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