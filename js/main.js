//Example fetch using pokemonapi.co

document.querySelector('button').addEventListener('click', getTime)


function convertToDaySavingTime(str){
  let arr = str.split(':')
  arr[0]++
  return arr.join(':')
}


function getTime(){
  
  fetch(`http://api.ipstack.com/2607:fb90:6087:6071:8c84:5dd4:fc99:541c?access_key=e90332557c688db469e2737b8bd4c473`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        let lat = data.latitude;
        let long = data.longitude;
        let date = document.querySelector('input').value

        fetch(`http://worldtimeapi.org/api/ip`)
          .then(res => res.json())
          .then(data => {
          console.log(data)
          let daySavingTime = data.dst;
        
          fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&${long}&date=${date}`)
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
  
