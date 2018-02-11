var rp = require('request-promise');
var help = require('../helpers/Helpers');

var cellarHelpers = {};
let wineList = [];

function makeURLs(data){
  const baseURL = "https://secret-scrubland-97629.herokuapp.com/api/wines/";

  let apiURLs = [];
  for (let i = 0; i< data.length; i++){
    var newURL = baseURL + data[i].wineID;
    //console.log(newURL);
    apiURLs.push(newURL);
  }
  //console.log(apiURLs);
  return apiURLs;
  //res.render('cellar', {user: req.user, wineList: apiURLs});
}

cellarHelpers.fetchUserWines = function(data, req, res){
  wineList = [];
  var urls = makeURLs(data);
  let promises = [];
  for (let i = 0; i < urls.length; i++){
    promises.push(apiCall(urls[i]));
  }

  Promise.all(promises).then(() => {
    //console.log(wineList);
    wineList.sort(help.by("winery", help.by("name", help.by("vintage"))));
    res.render('cellar', {user: req.user, wineList: wineList});
  }).catch(err => {
    console.log(err);
  });
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
