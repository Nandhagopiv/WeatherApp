import axios from "axios"
import { useState } from "react";
import mapCover from '../Assets/Images/mapBtnCover.png'

function Weather() {

    const [userInput, setUserInput] = useState('')
    const [city, setCity] = useState('')
    const [temp, setTemp] = useState('')
    const [climate, setClimate] = useState('')
    const[location,setLocation] = useState('')
    const[view,setView] = useState(false)

    const [titleArr, setTitleArr] = useState([])

    function handleChange(e) {
        setUserInput(e.target.value)
    }

    function check() {
        let weatherRep = axios(`https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=0efe0b956e513b1217ad609add553e0e`)
        weatherRep.then((data) => {
            setCity(data.data.name)
            setTemp(`${Math.floor(data.data.main.temp - 273.15)}° Celsius`)
            setClimate(data.data.weather[0].main)
            setLocation(`${data.data.coord.lat},${data.data.coord.lon}`)
            setView(true)

            if (data.data.weather[0].main === "Rain") {
                
            }

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

            let windDirec;

            if (data.data.wind.deg <= 20 && data.data.wind.deg >= 340) {
                windDirec = 'Towards North'
            } else if (data.data.wind.deg >= 20 && data.data.wind.deg <= 70) {
                windDirec = 'Towards North-East'
            } else if (data.data.wind.deg >= 70 && data.data.wind.deg <= 110) {
                windDirec = 'Towards East'
            } else if (data.data.wind.deg >= 110 && data.data.wind.deg <= 160) {
                windDirec = 'Towards South-East'
            } else if (data.data.wind.deg >= 160 && data.data.wind.deg <= 200) {
                windDirec = 'Towards South'
            } else if (data.data.wind.deg >= 200 && data.data.wind.deg <= 250) {
                windDirec = 'Towards South-West'
            } else if (data.data.wind.deg >= 250 && data.data.wind.deg <= 290) {
                windDirec = 'Towards West'
            } else if (data.data.wind.deg >= 290 && data.data.wind.deg <= 340) {
                windDirec = 'Towards North-West'
            }
            
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
                    val: `${(data.data.visibility)/1000} KM`,
                    color: "#1A2130"
                },
                {
                    title: "Wind Speed",
                    val: `${(((data.data.wind.speed)/1000)*(60*60)).toFixed(2)} KMPH`,
                    color: "#3ABEF9"
                },
                {
                    title: "Wind Direction",
                    val: windDirec,
                    color: "#FF9EAA"
                },
                {
                    title: "Temperature Maximum",
                    val: `${(data.data.main.temp_max - 273.15).toFixed(2)}° Celsius`,
                    color: "#EE4E4E"
                },
                {
                    title: "Temperature Minimum",
                    val: `${(data.data.main.temp_min - 273.15).toFixed(2)}° Celsius`,
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
                <h1 className="text-3xl font-bold text-center text-white">Check Weather in your City?</h1>
                <div>
                    <input value={userInput} onChange={handleChange} className="p-2 rounded-md rounded-r-none text-white outline-none font-bold bg-slate-900" placeholder="Enter your City" type="text"></input>
                    <button onClick={check} className="p-2 rounded-md rounded-l-none text-white bg-[#C80036] font-bold">Check</button>
                </div>
                
                <p className="text-4xl font-bold text-[#952323]">{city}</p>
                <p className="text-2xl font-semibold text-[#3E3232]">{temp}</p>
                <p className="text-4xl font-extrabold text-[#071952]">{climate} </p>
                <a className="text-md font-extrabold bg-green-950 text-white p-3 rounded-md" style={{ backgroundImage: `url(${mapCover})`,backgroundSize:'cover', display: view?'block':'none'}} href={`https://www.google.com/maps/place/${location}`}>View Location</a>
            </div>
            <div className="flex z-20 justify-between flex-wrap gap-2 m-10 text-center">
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