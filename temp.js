import React, {useEffect, useState} from 'react';
import "./style.css"
import Weathercard from "./weathercard";

const Temp = () => {
    const [searchValue, setSearchValue] = useState("Bengaluru");
    const [tempInfo, setTempInfo] = useState({});

    const getWeatherEvent = async () => {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=5435e9b3f1c329f8fb2d1ed8b66c4a6a`;

            const res = await fetch(url);
            const data = await res.json();

            //what data we want? There are too much data on that api
            const {temp, humidity, pressure} = data.main;
            const {speed} = data.wind;
            const {main: weathermood} = data.weather[0];//because we can define an array of an obj- weather:[{ id: 00,weathermood}]
            const {name} = data;
            const {country, sunset} = data.sys;


            //now I've to pass those data to my FE.
            //For that I need to crete an object-

            const myNewWeatherInfo = {
                temp,
                humidity,
                pressure,
                speed,
                weathermood,
                name,
                country,
                sunset,
            }; //now these data I need to store a state variable.
            setTempInfo(myNewWeatherInfo);

            console.log(temp);
        } catch (error) {
            console.log(error);
        }
    };

    //without refreshing/search our page we will get the weather
    useEffect(() => {
        getWeatherEvent(); //I want very first time this function should call
    }, []);


    return (
        <>
            <div className="wrap">
                <div className="search">
                    <input
                        type="search"
                        placeholder="search...."
                        autoFocus
                        id="search"
                        className="searchTerm"
                        value={searchValue}
                        //automatically add the value what user is typeing
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <button className="searchButton" type="button" onClick={getWeatherEvent}>Search</button>
                </div>
            </div>

            {/*//sending data from this page to weather page using Props*/}
            <Weathercard {...tempInfo}/>
        </>
    )
}

export default Temp;