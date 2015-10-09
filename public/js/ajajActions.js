var dayData; 


$(document).ready(function() {
	//array of day objects

	$.get('/api/days', function (data) {dayData = data})
  .fail( function (err) {console.error('err', err)} );




})