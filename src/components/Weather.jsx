import axios from "axios"
import { useState } from "react";

function Weather() {

    const [userInput, setUserInput] = useState('')
    const [city, setCity] = useState('')
    const [temp, setTemp] = useState('')
    const [climate, setClimate] = useState('')

    const [titleArr, setTitleArr] = useState([])

    function handleChange(e) {
        setUserInput(e.target.value)
    }

    function check() {
        let weatherRep = axios(`https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=0efe0b956e513b1217ad609add553e0e`)
        weatherRep.then((data) => {
            setCity(data.data.name)
            setTemp(`${data.data.main.temp} Kelvin`)
            setClimate(data.data.weather[0].main)

            const sunriseTimestamp = data.data.sys.sunrise
            const sunsetTimestamp = data.data.sys.sunset

            function unixTimestampToDateTime(timestamp) {
                const date = new Date(timestamp * 1000)
                const hours = date.getHours()
                const minutes = "0" + date.getMinutes()
                const seconds = "0" + date.getSeconds()
                const formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)
                return formattedTime
            }

            const sunriseTime = unixTimestampToDateTime(sunriseTimestamp)
            const sunsetTime = unixTimestampToDateTime(sunsetTimestamp)
            
            setTitleArr([
                {
                    title: "Humidity",
                    val: `${data.data.main.humidity}%`,
                    color: "#C80036"
                },
                {
                    title: "Pressure",
                    val: `${data.data.main.pressure} hPa`,
                    color: "#FF6969"
                },
                {
                    title: "Visibility",
                    val: `${data.data.visibility} Metre`,
                    color: "#1A2130"
                },
                {
                    title: "Wind Speed",
                    val: `${data.data.wind.speed} MPS`,
                    color: "#3ABEF9"
                },
                {
                    title: "Wind Direction",
                    val: `${data.data.wind.deg} degrees`,
                    color: "#FF9EAA"
                },
                {
                    title: "Temperature Maximum",
                    val: `${data.data.main.temp_max} Kelvin`,
                    color: "#EE4E4E"
                },
                {
                    title: "Temperature Minimum",
                    val: `${data.data.main.temp_min} Kelvin`,
                    color: "#2C4E80"
                },
                {
                    title: "Longitude",
                    val: data.data.coord.lon,
                    color: "#79155B"
                },
                {
                    title: "Latitude",
                    val: data.data.coord.lat,
                    color: "#0C356A"
                },
                {
                    title: "Sunrise Time",
                    val: sunriseTime,
                    color: "#FFC436"
                },
                {
                    title: "Sunset Time",
                    val: sunsetTime,
                    color: "#FF6D60"
                }
            ])
        }).catch(() => {
            alert("Invalid City Name. Try Again")
        })
    }

    return (
        <>
            <div className="flex flex-col gap-5 items-center p-10">
                <h1 className="text-3xl font-bold text-center text-[#32012F]">Check Weather in your City?</h1>
                <div>
                    <input value={userInput} onChange={handleChange} className="p-2 rounded-md rounded-r-none text-white outline-none font-bold bg-slate-900" placeholder="Enter your City" type="text"></input>
                    <button onClick={check} className="p-2 rounded-md rounded-l-none bg-white font-bold">Check</button>
                </div>
                <p className="text-4xl font-bold text-[#952323]">{city}</p>
                <p className="text-2xl font-semibold text-[#3E3232]">{temp}</p>
                <p className="text-4xl font-extrabold text-[#071952]">{climate} </p>
            </div>
            <div className="flex justify-between flex-wrap gap-2 m-10 text-center">
                {
                    titleArr.map((data, index) => {
                        return <div key={index} style={{ backgroundColor: `${data.color}` }} className=" p-5 flex-grow rounded-md">
                            <p className="text-2xl font-bold  text-white ">{data.title}</p>
                            <p className="text-xl font-bold mt-2 text-white">{data.val}</p>
                        </div>
                    })
                }

            </div>
        </>

    )
}

export default Weather