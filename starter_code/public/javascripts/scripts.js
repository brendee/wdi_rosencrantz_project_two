$(function(){

console.log("Connection made");

var categories = [{"id":4,"name":"actors"},{"id":5,"name":"singers"},{"id":6,"name":"dancers"}];

	var seeCategories = $('#categories');
	seeCategories.on('click', function(event) {
	var leftColumn = $('.column_header1');
	leftColumn.append("Actors");
	contactsInCategory("actors");

	var middleColumn = $('.column_header2');
	middleColumn.append("Singers");
	contactsInCategory("dancers");

	var rightColumn = $('.column_header3');
	rightColumn.append("Dancers");
	contactsInCategory("singers");
	})

function contactsInCategory(category) {
		for (c = 0; c < categories.length; c++){
			if (category == categories[c]["name"]) {
			category_id = categories[c]["id"];		
			}
		}

	$.ajax({
		url: '/categories/' + category_id,
		type: 'GET'
	}).done(function(data){
		
		var contacts = data["contacts"];
		console.log(contacts);
		var ul = $("#" + category);
		
		for (i = 0; i < contacts.length; i++) {
			var contactName = contacts[i]["name"];
			ul.append("<li id='contact_li'>" + contactName + "</li>");
		}
	})
};

$.ajax({
	url:'/categories',
	type: 'GET'
}).done(function(data){
	console.log(data)
var category = data;
for (i=0; i < category.length; i++) {
	var dropdown = $('select');
	dropdown.append('<option value="' + category[i].id + '">' + category[i]["name"] + '</option>'); 

}

})

// Get RandomAPI photo
// Begin Random API AJAX call
// function getRandomImage() {
$.ajax({
  url: 'http://api.randomuser.me/',
  dataType: 'json'
}).done(function(data){
    console.log(data);
    var image = data["results"][0]["user"]["picture"]["thumbnail"];
    	console.log(image);
    	var picture = $('#picture');
		
		var addRandomPhotoButton = $('#random_image');
		addRandomPhotoButton.on('click', function(event) {
		picture.val(image);
	});
});
// End RandomAPI AJAX call
// };
// End RandomAPI function

// var picture = $('#picture');
// var addRandomPhoto = $('#random_image');
// 	addRandomPhoto.on('click', function(event) {
// 		picture.val("'"+image+"'");
// 	});

var addContact = $('#add');
		addContact.on('click', function(event) {
		event.preventDefault();
		var name = $('#name').val();
		var age = $('#age').val();
		var address = $('#address').val();
		var picture = $('#picture').val();
		var phone_number = $('#phone_number').val();
		var category = $('#category').val();
		var category_id = $('#category_id').val();
		var ul = $('ul');
		console.log("Add button has been clicked");
		console.log(category_id);

		// checkForm();

		$.ajax({
			url:'/contacts',
			type: 'POST',
			data: {"name": name, "age": age, "address": address, "picture": picture, "phone_number": phone_number, "category_id": category_id }
		}).done(function(data){
			console.log(data);
		});
	});


function checkForm() {
  var fields = $(".required")
        .find("select, input").serializeArray();
  
  $.each(fields, function(i, field) {
    if (!field.value)
      alert(field.name + ' is required');
   }); 
  console.log(fields);
}

var seeContacts = $('#contacts');
	seeContacts.on('click', function(event) {
		allContacts();
	})

function allContacts() {
		$.ajax({
			url:'/contacts',
			type: 'GET'
		}).done(function(data){
			var contacts = data;
			console.log(data);
			var ul = $('.all_contacts');
			var h2 = $('.all_headers');
			// var li = $('#data.id');
			h2.append("All Contacts")
			for (i=0; i < contacts.length; i++) {
			ul.append("<li id='" + contacts[i]["id"] + "'>" + contacts[i]["name"] + "<br>" + "<button class='view'>View Contact</button>" + " " + "<button class='delete'>Delete</button>" + " " + "<button class='edit'>Edit</button>" + "</li>");
			}
		
			var editButton = $('button.edit');
			editButton.on('click', function(){
			$(this).parent().append("<p><input id='newName' placeholder='Update name'></p><p><input id='newAge' placeholder='Update age'></p><p><input id='newAddress' placeholder='Update address'></p><p><input id='newPhoneNumber' placeholder='Update phone number'></p><p><input id='newPicture' placeholder='New image'></p><p><select id='" + contacts["category_id"] + "'><option selected='selected'>Select category</option>" + category_id + "</select></p><p><button class='save'>Save Changes</button></p>");
			console.log("check check");
			saveChangesListener();	

			// var category = data["category_id"];
			// for (i=0; i < category.length; i++) {
			// var dropdown = $('#newCategoryId');
			// dropdown.append('<option value="' + category[i].id + '">' + category[i]["name"] + '</option>'); 
			// }
			});

		viewContact();
		deleteButtonListener();
		});
};

// function viewContact(contact) {
// 	var viewContact = $('button.view');
// 	var id = $(this).parent().attr("id");
// 	console.log(id);
// 	viewContact.on("click", function() {
// 			console.log("check check");
	

// 	$.ajax({
// 		url:'/contacts/' + id,
// 		type: 'GET'
// 	}).done(function(data){
// 		console.log(data);
// 		// var ul = $("." + id);
		
// 		// for (i = 0; i < contacts.length; i++) {
// 		// 	var contactName = contacts[i]["name"];
// 		// 	ul.append("<li>" + contactName + "</li>");
// 		// }
// 	})
// })
// function viewContact() {
// 		var viewContact = $('button.view');
		
// 	viewContact.on("click", function() {
//  			$(this).parent().append(name + age);
// // 			console.log("check check");
// 	})
// }


// function editButtonListener() {
// 	var editButton = $('button.edit');
// 		editButton.on('click', function(){
// 			$(this).parent().append("<p><input id='newName' placeholder='Update name'></p><p><input id='newAge' placeholder='Update age'></p><p><input id='newAddress' placeholder='Update address'></p><p><input id='newPhoneNumber' placeholder='Update phone number'></p><p><input id='newPicture' placeholder='New image'></p><p><select id='newCategoryId'><option selected='selected'>Select category</option></select></p><p><button class='save'>Save Changes</button></p>");
// 			console.log("check check");
// 			saveChangesListener();	
// 		});
// };


function saveChangesListener() {
	var saveChanges = $('button.save');
		saveChanges.on("click", function() {
			var id = $(this).parent().attr("id");
			
			var newNameInput = $("input#newName");
			var newAgeInput = $("input#newAge");
			var newAddressInput = $("input#newAddress");
			var newPhoneNumberInput = $("input#newPhoneNumber");
			var newPictureInput = $("input#newPicture");
			// var newCategoryID = $("input#newCategoryId");
			
			var newName = newNameInput.val();
			var newAge = newAgeInput.val();
			var newAddress = newAddressInput.val();
			var newPhoneNumber = newPhoneNumberInput.val();
			var newPicture = newPictureInput.val();
			// var newCategoryId = newCategoryId.val();

// 			editContact(newName, newAge, id, newAddress, newPicture, newPhoneNumber);

// 	});
// };

// function editContact(name, age, id, address, picture, phone_number) {
	$.ajax({
		url:'/contacts/'+id,
		type: 'PUT',
		data: {"name": name, "age": age, "address": address, "picture": picture, "phone_number": phone_number, "category_id": category_id, "id": id }	
	}).done(function(response){
		console.log(response);
		var data = response;
		var li = $("#"+data.id);
		li.html("Name: " + data.name + " " + "Age: " + data.age + "</br><button class='edit'>Edit</button>");
		});
	});
}

function deleteButtonListener() {
	var deleteButton = $('.delete');
	deleteButton.on("click", function() {
		console.log('Delete button working');
		var name = $('#name').val();
		var age = $('#age').val();
		var address = $('#address').val();
		var picture = $('#picture').val();
		var phone_number = $('#phone_number').val();
		var category = $('#category').val();
		var category_id = $('#category_id').val();
		var id = $(this).parent().attr("id");
		var li = $('#'+id);
		// var contact_li =$('#contact_li'+id);

		li.remove();
		// contact_li.remove();

	$.ajax({
		url:'/contacts/'+id,
		type: 'DELETE',
		data: {"name": name, "age": age, "address": address, "picture": picture, "phone_number": phone_number, "category_id": category_id, "id": id }	
	}).done(function(response){
		console.log(response);
	})
	});
};


function viewContact() {
	var viewContact = $('button.view'); 
	viewContact.on("click", function() {
		console.log('View button working');
		var name = $('#name').val();
		var age = $('#age').val();
		var address = $('#address').val();
		var picture = $('#picture').val();
		var phone_number = $('#phone_number').val();
		var category = $('#category').val();
		var category_id = $('#category_id').val();
		var id = $(this).parent().attr("id");
		var li = $('.detail_view');

	$.ajax({
		url:'/contacts/'+id,
		type: 'GET'
	}).done(function(response){
		console.log(response);
		li.append(name + age + address);
	})
	});
};

// Closing tag
});