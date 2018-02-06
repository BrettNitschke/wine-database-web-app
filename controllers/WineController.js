var request = require('request');
var help = require('../helpers/Helpers');

var winesController = {};

//get all wines in wines api database
winesController.wines = function(req, res){
  request('https://secret-scrubland-97629.herokuapp.com/api/wines', function(error, response, body){
    if(!error && response.statusCode == 200){
      const data = JSON.parse(body);
      //console.log(data);
      //data.sort(sort_by('winery', false, function(a){return a.toUpperCase()}));
      data.sort(help.by("winery", help.by("name", help.by("vintage"))));
      res.render('wines', {wineList: data, user: req.user });
    }
  });
}

//get add wine
winesController.addWine = function(req, res){
  res.render('addWine', {user: req.user});
}

//post add wine
winesController.doAddWine = function(req, res){
  var winery = req.body.winery;
  var name = req.body.name;
  request.post({
          url:'https://secret-scrubland-97629.herokuapp.com/api/addwine',
          form: {
            winery: winery.toProperCase(),
            name: name.toProperCase(),
            vintage: req.body.vintage
          }},
          function(err,httpResponse,body){
            console.log(body);
            res.redirect('/wines');
          });
}

String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};



module.exports = winesController;
