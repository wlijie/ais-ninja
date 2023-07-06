
async function search_weather({location}) {
  ais_progress(`searching ${location}`)
  return await fetch(`https://api.seniverse.com/v3/weather/daily.json?key=4r9bergjetiv1tsd&location=${location}&language=zh-Hans&unit=c&start=-1&days=5`)
    .then(res => res.json());
}

// process.env.SENIVERSE_API_KEY = ''
// search_weather({location: 'beijing'}).then(console.log)
