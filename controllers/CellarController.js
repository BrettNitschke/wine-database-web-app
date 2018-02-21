var mongoose = require('mongoose');
var User = require('../models/User');
var request = require('request');
var help = require('../helpers/Helpers');
var celHelp = require('../helpers/CellarHelpers');

var cellarController = {};


//get users cellar
cellarController.getCellar = function(req, res) {
  var query = User.findOne({username: req.user.username}).select('wines.wineID');
  query.exec(function(err, data){
    if (err)
      res.send(err);
    celHelp.fetchUserWines(data.wines, function(wineList){
      wineList.sort(help.by("winery", help.by("name", help.by("vintage"))));
      res.render('cellar', {user: req.user, wineList: wineList});
    });
  });
};


//add wine to users cellar
cellarController.addToCellar = function(req, res){
  var wineID = req.params.wine_id;
  console.log(wineID, req.user.name);
  var wineToAdd = {"wineID": wineID};

  User.findOneAndUpdate({username: req.user.username}, {$push: {wines: wineToAdd}}, function(err){
    if (err)
      res.send(err);
    console.log(wineID, " added to ", req.user.username);
    res.redirect('/cellar');
  });
};







module.exports = cellarController;
