var express = require('express');
var daysRouter = express.Router();
var models = require('../../models');
var Day = models.Day;
var Hotel = models.Hotel;
var Restaurant = models.Restaurant;
var Activity = models.Activity;
var Promise = require('bluebird');

daysRouter.get("/api/days", function(req, res, next){
  Day.find({}, function(err, days){
    res.send(days);
  });

})

// Creating a day and adding to the database.
daysRouter.post("/api/days", function(req, res, next){
  Day.find({}, function(err, data){
    console.log(data.length);
    var dayNumber = data.length + 1;
    var newDay = new Day({
      number: dayNumber
    })
    newDay.save(function(err, data){
      res.send(data);
    })
  })
});

// Get a single day
daysRouter.get("/api/days/:number", function(req, res, next){
  var dayNumber = req.params.number;
  console.log(dayNumber);
  Day.findOne({ number: dayNumber}, function(err, day){
    res.send(day);
  })
});

daysRouter.post("/api/days/:number", function(req, res, next){

});

// Deleting specific day from database
daysRouter.delete("api/days/:number", function(req, res, next){

});

daysRouter.post("api/days/:number/hotel", function(req, res, next){

});

daysRouter.delete("api/days/:number/hotel", function(req, res, next){

});

daysRouter.post("api/days/:number/restuarants", function(req, res, next){

});

daysRouter.delete("api/days/:number/restaurants", function(req, res, next){

});

daysRouter.post("api/days/:number/activities", function(req, res, next){

});

daysRouter.delete("api/days/:number/activities", function(req, res, next){

});

module.exports = daysRouter;