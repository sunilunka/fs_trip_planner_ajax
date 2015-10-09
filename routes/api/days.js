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
    res.json(days);
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



// Deleting specific day from database
daysRouter.delete("/api/days/:number", function(req, res, next){
  Day.remove({number: req.params.number}, function (err, day) {
    res.send("day deleted")})
});

daysRouter.post("/api/days/:number/hotel", function(req, res, next){
  Day.where({number: req.params.number}).update({hotel: req.body.hotel}, function (err, day){
    res.send("hotel added")
  })
});

daysRouter.put("/api/days/:number/hotel", function(req, res, next){
  Day.where({number: req.params.number}).update({hotel: null}, function (err, day){
    res.send("hotel " + req.body.hotel + " removed")
  })
});

daysRouter.post("/api/days/:number/restaurants", function(req, res, next){
  Day.findOne({number: req.params.number}, function (err, day) {
    day.restaurants.addToSet(req.body.restaurant)
    day.save(function(err, data){
      res.send(data);
    })
 })
});

daysRouter.put("/api/days/:number/restaurants", function(req, res, next){
  Day.findOne({number: req.params.number}, function (err, day) {
    var restIndex = day.restaurants.indexOf(req.body.restaurant)
    day.restaurants.splice(restIndex,1)
    day.save(function(err, data){
      res.send(data);
  })
 })
});

daysRouter.post("/api/days/:number/activities", function(req, res, next){
  Day.findOne({number: req.params.number}, function (err, day) {
    day.activities.addToSet(req.body.activity)
    day.save(function(err, data){
      res.send(data);
    })
 })
});

daysRouter.put("/api/days/:number/activities", function(req, res, next){
  Day.findOne({number: req.params.number}, function (err, day) {
    var actIndex = day.activities.indexOf(req.body.activity)
    day.activities.splice(actIndex,1)
    day.save(function(err, data){
      res.send(data);
  })
 })
});


daysRouter.put("/api/days/:number/currentDay", function(req, res, next){
  Day.find({}).exec().then(
    function (days) {
      console.log(days)
      for (var i = 0; i < days.length; i++ )  {
        days[i][currentDay] = false;
        days[i].save()
      }
  }).then(function () {
    Day.where({number: req.params.number}).update({currentDay: true}, function (err, day){
  res.send("message")
  }) 
})
})


module.exports = daysRouter;