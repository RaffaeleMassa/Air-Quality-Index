import axios from "axios"
import css from /src/styles.css

async function requestPollutionData() {
  
  const API_KEY = process.env.API_KEY

  
  const result = await axios.get(`https://api.waqi.info/feed/geo:${lat};${lon}/?token=${API_KEY}`) 

  
}

requestPollutionData() 