var mongoose = require('mongoose');
var User = require('../models/User');
var request = require('request');
var celHelp = require('../helpers/CellarHelpers');
var cellarController = {};


//get users cellar
cellarController.getCellar = function(req, res) {
  var query = User.findOne({username: req.user.username}).select('wines.wineID');
  query.exec(function(err, data){
    if (err)
      res.send(err);
    //var wines = celHelp.makeURLs(data.wines);
    celHelp.fetchUserWines(data.wines, req, res);
    //res.render('cellar', {user: req.user, wineList: wines});
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


  //res.render('cellar', {user: req.user, wineID: wineID});




module.exports = cellarController;
