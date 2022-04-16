

document.querySelector('button').addEventListener('click', getTime)


function convertToDaySavingTime(str){
  let arr = str.split(':')
  arr[0]++
  return arr.join(':')
}


function getTime(){
  
  fetch(`https://ipapi.co/json/`)
    .then(res => res.json())
    .then(data => {
      console.log(data)
     let lat = data.latitude;
      let long = data.longitude;
      let date = document.querySelector('input').value
      document.querySelector('#location').innerText = `Location: ${data.city}, ${data.country_name}`

   

        fetch(`https://worldtimeapi.org/api/ip`)
          .then(res => res.json())
          .then(data => {
          console.log(data)
          let daySavingTime = data.dst;
        
          fetch(`https://cors-anywhere.herokuapp.com/http://api.sunrise-sunset.org/json?lat=${lat}&${long}&date=${date}`)
          .then(res => res.json())
          .then(data => {
            console.log(data)
            
            if(daySavingTime){
              document.querySelector('#sunrise').innerText = `Sunrise: ${convertToDaySavingTime(data.results.sunrise)}`
              document.querySelector('#sunset').innerText = `Sunset: ${convertToDaySavingTime(data.results.sunset)}`
            }else{
              document.querySelector('#sunrise').innerText = `Sunrise: ${data.results.sunrise}`
              document.querySelector('#sunset').innerText = `Sunset: ${data.results.sunset}`
            }
          })
          .catch(err => {
             console.log(`error ${err}`)
          });


        })
        .catch(err => {
            console.log(`error ${err}`)
        })


      })
      .catch(err => {
          console.log(`error ${err}`)
      })
  }
  
