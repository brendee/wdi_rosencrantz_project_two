$(function(){

console.log("Connection made");

$.ajax({
	url:'/categories',
	type: 'GET'
}).done(function(data){
	console.log(data)
var category = data;
console.log(data);
var h21 = $('.column_header1');
h21.append(category[0]["name"]);

var h22 = $('.column_header2');
h22.append(category[1]["name"]);

var h23 = $('.column_header3');
h23.append(category[2]["name"]);

// for (i=0; i < category.length; i++) {
// h2.append(category[i]["name"]);
// closing loop tag
// }

// closing AJAX tag
})




// <div class="row">
// 			<section class="col-md-3 col-md-offset-1">
// 				<h2></h2>
// 			</section>
// 			<section class="col-md-3 col-md-offset-1">
// 				<h2></h2>
// 			</section>
// 			<section class="col-md-3 col-md-offset-1">
// 				<h2></h2>
// 			</section>
// 		</div>



// Closing tag
});