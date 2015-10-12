var ajajModule = (function(){ 

  var dayData; 

  var $newDayBtn = $(".new-day-btn");

  var exports = {};

  exports.addHotel =  function(dayNum, self){
    var hotel = self.siblings("select").val();
    $.post("/api/days/" + dayNum + "/hotel",
      { hotel: hotel }, function(){
        console.log("Hotel: ", hotel, " added");
      })
  }

  exports.removeHotel = function(dayNum, self){
    var hotel = self.data("id");
    $.ajax({
      url: "/api/days/" + dayNum + "/hotel",
      method: "PUT",
      content: {
        hotel: hotel
      },
      success: function(){
        console.log("hotel removed");
      },

      error: function(err){
        console.log(err);
      } 
    });

  }

  $(document).ready(function() {
  	//array of day objects

    $.post("/api/days", function(){
      console.log("day 1 created");
    })

  	$.get('/api/days', function (data) {dayData = data})
    .fail( function (err) {console.error('err', err)} );

    $(".new-day-btn").on("click", function(){
      $.post("/api/days", function(){
        $.get('/api/days', function (data) {
          dayData = data
        });     
      })
    })






    // $('*[data-type="hotel"]').on("click", function(){
    //   console.log("hotel button clicked");
    // })
    

  })

  return exports  

}());

// daysRouter.post("/api/days", function(req, res, next){
//     Day.find({}, function(err, data){
//       console.log(data.length);
//       var dayNumber = data.length + 1;
//       var newDay = new Day({
//         number: dayNumber
//       })
//       newDay.save(function(err, data){
//         res.send(data);
//       })
//     })
//   });