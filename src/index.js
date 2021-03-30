import axios from "axios"

async function callLambdaFunction() {
 
  const response = await axios.get("/.netlify/functions/getPollution")

  console.log(response) 
} 

callLambdaFunction()

const errorLabel = document.querySelector("label[for='error-msg']")
const latInp = document.querySelector("#latitude")
const lonInp = document.querySelector("#longitude")
const airQuality = document.querySelector(".air-quality")
const airQualityStat = document.querySelector(".air-quality-status")
const srchBtn = document.querySelector(".search-btn")

const API_KEY = process.env.API_KEY ;


const getUserLocation = () => {
	// Get user Location
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(onPositionGathered, onPositionGatherError)
	} else {
		onPositionGatherError({ message: "Can't Access your location. Please enter your coordinates" })
	}
}

const onPositionGathered = (pos) => {
	let lat = pos.coords.latitude.toFixed(4), lon = pos.coords.longitude.toFixed(4)

	// Set values of Input for user to know
	latInp.value = lat
	lonInp.value = lon

	// Get Air data from weather API
	getAirQuality(lat, lon)
}


const getAirQuality = async (lat, lon) => {
	// Get data from api
	const data = await fetch(`https://api.waqi.info/feed/geo:${lat};${lon}/?token=${API_KEY}` ).catch(err => {
		onPositionGatherError({ message: "Something went wrong. Check your internet conection." })
		console.log(err)
	})
	const airData = await data.json()
	setValuesOfAir(airData)
	
}

const setValuesOfAir = airData => {
	aqi =  _.get(airData, 'data.aqi', 0); 
	let airStat = "", color = ""

	// Set Air Quality Index
	airQuality.innerText = aqi
    
	if (aqi<50) {
	
        airStat = "Good"
		color = "rgb(44, 255, 2)"
	} else if  (aqi<100){
        airStat = "Moderate"
        color = "rgb(109, 121, 4)"
    } else if (aqi<150) {
        airStat = "Unhealthy for S.g."
        color = "rgb(109, 121, 4)"
	} else if(aqi<200){
        airStat = "Unhealthy"
        color = "rgb(204, 83, 13)"
    } else if(aqi < 250) {
	    airStat = "Very Unhealthy"
	    color = "rgb(245, 94, 6)"
	} else if(aqi < 300)
        airStat = "Hazardous"
        color = "rgb(255,0,0)"
    



airQualityStat.innerText = airStat
airQualityStat.style.color = color
}


const onPositionGatherError = e => {
errorLabel.innerText = e.message
}

srchBtn.addEventListener("click", () => {
getAirQuality(parseFloat(latInp.value).toFixed(4), parseFloat(lonInp.value).toFixed(4))
})

getUserLocation()