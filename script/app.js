'use strict';

var trainList = [{
  Nr: '42',
  Avgår: '10:25',
  Ankommer: '11:23'
}, 
{
  Nr: '42',
  Avgår: '12:25',
  Ankommer: '13:23'
}, 
{
  Nr: '42',
  Avgår: '14:25',
  Ankommer: '15:23'
}];

function HTMLrow(obj) {
  var row = '<tr>';    
  for(let prop in obj) {
    row += `<td>${obj[prop]}</td>`;
  }
  row += `</tr>`;
  return row;
}

function toHTML(id, list) {
  for(let element of list)  {
    // document.getElementById("#" + id).innerHTML += HTMLrow(element)
    $("#" + id).append(HTMLrow(element));
  }
}

function searchTrain() {
  $('#from-city').html($('#userform').val());
  toHTML('train_tabels', trainList);
  return false;
}

//kan detta bli fel om anropet kommer från githubPages
//ajax
$.get("https://api.openweathermap.org/data/2.5/forecast?q=nynashamn,se&appid=3303a2c629c6fb52ac2ff35987de5999", function(data) {
  var weatherDataList = data.list;
  weatherDataList.splice(5);
  weatherDataList = weatherDataList.map(element => {
    
   return {time: element.dt_txt,
      weather: element.weather[0].main,
        temp: element.main.temp,
          windSpeed: element.wind.speed}
  });
  toHTML('weather_data', weatherDataList);
});