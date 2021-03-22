import axios from "axios"


async function requestPollutionData() {
  
  const API_KEY = process.env.API_KEY

  
  const result = await axios.get(`https://api.waqi.info/feed/geo:${lat};${lon}/?token=${API_KEY}`) 

  
}

requestPollutionData() 