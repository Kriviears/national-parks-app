'use strict';

// useful constants
const API_KEY = 'fb0cFS5dPVJBtCkd1nHb0wTd15dcy0epeLNN2nZi';
const parkURL = 'https://developer.nps.gov/api/v1/parks';


//Generator functions
function formatQueryParams(params){
  const queryItems = Object.keys(params).map(key => 
    `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  return queryItems.join('&');
}

function displayResults(responseJson){
  $('#results-list').empty();

  for(let i=0; i<responseJson.data.length; i++){
    $('#results-list').append(
      `<li>
      <h3>${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[i].description}</p>
      <a href="${responseJson.data[i].url}" rel="noopener noreferrer" target="_blank">${responseJson.data[i].url}</a>
      </li>`
    );
  }
  $('#results').removeClass('hidden');
}


//Implementor functions
function getParks(stateCode, limit){
  const params = {
    api_key: API_KEY,
    stateCode: stateCode,
    limit: limit 
  };
  const queryString = formatQueryParams(params);
  const url = parkURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response =>{
      if (response.ok){
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err =>{
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm(){
  $('#js-form').submit(event =>{
    event.preventDefault();
    const stateCode = $('#js-state-code').val().join(',');
    console.log(stateCode);
    const limit = $('#js-max-results').val();
    getParks(stateCode, limit);
  });
}

$(watchForm);