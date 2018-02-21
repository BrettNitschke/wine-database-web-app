var rp = require('request-promise');

var cellarHelpers = {};
let wineList = [];




cellarHelpers.fetchUserWines = function(data, callback){
  wineList = [];
  var urls = makeURLs(data);
  let promises = [];
  for (let i = 0; i < urls.length; i++){
    promises.push(apiCall(urls[i]));
  }

  Promise.all(promises).then(() => {
    callback(wineList);
  }).catch(err => {
    console.log(err);
  });
}

function makeURLs(data){
  const baseURL = "https://secret-scrubland-97629.herokuapp.com/api/wines/";

  let apiURLs = [];
  for (let i = 0; i< data.length; i++){
    var newURL = baseURL + data[i].wineID;
    apiURLs.push(newURL);
  }
  return apiURLs;
}

function apiCall(urlApi){
  return rp({url: urlApi, json: true}).then(function(obj){
    return arrayInsert(obj);
  })
}

function arrayInsert(obj) {
  wineList.push(obj);
}

module.exports = cellarHelpers;
