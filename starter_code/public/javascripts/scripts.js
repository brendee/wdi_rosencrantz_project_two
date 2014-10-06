$(function(){

console.log("Connection made");

// var refresh = $('span');
// refresh.on('click', function(event) {
// 	console.log(event);
//   location.reload();
// });

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
		// console.log(contacts);
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
	// console.log(data)
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
  url: 'http://api.randomuser.me/?gender=female',
  dataType: 'json'
}).done(function(data){
    // console.log(data);
    var image = data["results"][0]["user"]["picture"]["large"];
    	// console.log(image);
    	var picture = $('#picture');
		
		var addRandomPhotoButton = $('#random_image');
		addRandomPhotoButton.on('click', function(event) {
			event.preventDefault();
			picture.val(image);
	});
});
// End RandomAPI AJAX call
// };
// End RandomAPI function

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

		checkForm();

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
			h2.append("All Contacts")
			for (i=0; i < contacts.length; i++) {
			ul.append("<li id='" + contacts[i]["id"] + "'>" + contacts[i]["name"] + "<br>" + "<button class='view'>View Contact</button>" + " " + "<button class='delete'>Delete</button>" + "</li>");
			}
		
		viewContact();
		deleteButtonListener();
		});
};

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
		var id = $(this).parent().attr("id");
		var ul = $('.details');

	$.ajax({
		url:'/contacts/'+id,
		type: 'GET'
		}).done(function(response){
		console.log(response);
		ul.append("<h2>Contact Details</h2>" + "<img src='" + response["picture"] + "'>" + "Name: " + response["name"] + "<br>" + "Age: " + response["age"] + "<br>" + "Address: " + response["address"] + "<br>" + "Phone: " + response["phone_number"] + "<input id='id' type='hidden' value='" + id + "'>" + "<p><a href='/index.html'><span class='glyphicon glyphicon-refresh'></span></a></p>" + "<p><button class='edit'>Edit</button><br><br></p>");
			editButtonListener();
		})
	})
}; 


function editButtonListener() {
	var editButton = $('button.edit');
			editButton.on('click', function(){
			// var id = $(this).parent().attr("id");
			// console.log(id);
			$(this).parent().append("<p><input id='newName' value='" + name + "'" + "placeholder='Update name'></p><p><input id='newAge' placeholder='Update age'></p><p><input id='newAddress' placeholder='Update address'></p><p><input id='newPhoneNumber' placeholder='Update phone number'></p><p><input id='newPicture' placeholder='Add new image URL'></p><p><button id='new_random_image'>Assign Random Photo</button></p><p><select id='new_category_id'><option selected='selected'>Select category</option></select></p><p><button class='save'>Save Changes</button></p>");

				$.ajax({
	url:'/categories',
	type: 'GET'
}).done(function(data){
	// console.log(data)
var category = data;
for (i=0; i < category.length; i++) {
	var dropdown = $('select#new_category_id');
	dropdown.append('<option value="' + category[i].id + '">' + category[i]["name"] + '</option>'); 
	}
})

$.ajax({
  url: 'http://api.randomuser.me/?gender=female',
  dataType: 'json'
}).done(function(data){
    // console.log(data);
    var image = data["results"][0]["user"]["picture"]["large"];
    	// console.log(image);
    	var picture = $('#newPicture');
		
		var addRandomPhotoButton = $('#new_random_image');
		addRandomPhotoButton.on('click', function(event) {
			event.preventDefault();
			picture.val(image);
	});
});

			saveChangesListener();	
			});
}

function saveChangesListener() {
	var saveChanges = $('button.save');
		saveChanges.on("click", function() {
			
			var newNameInput = $("input#newName");
			var newAgeInput = $("input#newAge");
			var newAddressInput = $("input#newAddress");
			var newPhoneNumberInput = $("input#newPhoneNumber");
			var newPictureInput = $("input#newPicture");
			var newCategoryIdInput = $('select#new_category_id');
			var id = $("input#id");

			var newName = newNameInput.val();
			var newAge = newAgeInput.val();
			var newAddress = newAddressInput.val();
			var newPhoneNumber = newPhoneNumberInput.val();
			var newPicture = newPictureInput.val();
			var newCategoryId = newCategoryIdInput.val();
			var newId = id.val();

			editContact(newName, newAge, newAddress, newPhoneNumber, newPicture, newCategoryId, newId);

	});
};

function editContact(name, age, address, phone_number, picture, category_id, id) {
	$.ajax({
		url:'/contacts/'+id,
		type: 'PUT',
			data: {"name": name, "age": age, "address": address, "phone_number": phone_number, "picture": picture, "category_id": category_id, "id": id }
	}).done(function(response){
		console.log(response);
		var contacts = response;
		// var li = contacts[i]["id"];
				// $('li').html("<li>" + 'Name: '+ newName + "<br>" + 'Age: ' +newAge + 'Phone Number: ' +phone_number );
		});
				// window.location.reload();

	// });
}

// Closing tag
});