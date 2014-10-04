$(function(){

console.log("Connection made");

$.ajax({
  url: 'http://api.randomuser.me/',
  dataType: 'json',
  success: function(data){
    console.log(data);
  }
});

// function allCategories() {
$.ajax({
	url:'/categories',
	type: 'GET'
}).done(function(data){
	console.log(data)
var category = data;
for (i=0; i < category.length; i++) {
	var dropdown = $('select');
// var dropdown_option = '<option value="' + category.id + '">' + category.name + '</option>'
	dropdown.append('<option value="' + category[i].id + '">' + category[i]["name"] + '</option>'); 
// closing loop tag
}
	function allCategories() {
		var leftColumn = $('.column_header1');
		leftColumn.append(category[0]["name"]);

		var middleColumn = $('.column_header2');
		middleColumn.append(category[1]["name"]);

		var rightColumn = $('.column_header3');
		rightColumn.append(category[2]["name"]);
	}

	var seeCategories = $('#categories');
	seeCategories.on('click', function(event) {
		allCategories();
	})

// closing AJAX tag
})
// }

// var addContactForm = $('#add_contacts');
// 	addContactForm.on('click', function(event) {
// 		var form = $('form');
// 		form.append("
// <input type='text' name='name' id='name' placeholder='Name' required><input type='text' age='age' id='age' placeholder='Age' required><input type='address' name='address' id='address' placeholder='Address'><input type='text' name='phone_number' id='phone_number' placeholder='Phone'><input type='text' name='picture' id='picture' placeholder='Image URL'><select name='category_id' id='category_id' required><option selected='selected'>Select category</option></select><button id='add'>Add</button>");
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

		$.ajax({
			url:'/contacts',
			type: 'POST',
			data: {"name": name, "age": age, "address": address, "picture": picture, "phone_number": phone_number, "category_id": category_id }
		}).done(function(data){
			console.log(data);
		});
	});

var seeContacts = $('#contacts');
	seeContacts.on('click', function(event) {
		allContacts();
		// $('#show_hide').toggle();
	})

function allContacts() {
		$.ajax({
			url:'/contacts',
			type: 'GET'
		}).done(function(data){
			var contacts = data;
			console.log(data);
			var ul = $('.all_contacts');
			var h2 = $('.all_header');
			// var li = $('#data.id');
			h2.append("All Contacts")
			for (i=0; i < contacts.length; i++) {
			ul.append("<li id='" + contacts[i]["id"] + "'>" + contacts[i]["name"] + "<br>" + "<button class='delete'>Delete</button><button class='edit'>Edit</button>" + "</li>");
			}
		editButtonListener();	
		deleteButtonListener()
		});
};


function editButtonListener() {
	var editButton = $('button.edit');
		editButton.on('click', function(){
			$(this).parent().append("<p><input id='newName' placeholder='Update name'></p><p><input id='newAge' placeholder='Update age'></p><p><input id='newAddress' placeholder='Update address'></p><p><input id='newPhoneNumber' placeholder='Update phone number'></p><p><input id='newPicture' placeholder='New image'></p><p><select id='newCategoryId'><option selected='selected'>Select category</option></select></p><p><button class='save'>Save Changes</button></p>");
			console.log("check check");
			saveChangesListener();	
		});
};

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
			var newCategoryId = newCategoryId.val();

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

		li.remove();
// 		deleteContact(name, age, address, picture, phone_number, category_id);
// 	})
// }

// function deleteContact(name, age, address, picture, phone_number, category_id, id) {
	$.ajax({
		url:'/contacts/'+id,
		type: 'DELETE',
		data: {"name": name, "age": age, "address": address, "picture": picture, "phone_number": phone_number, "category_id": category_id, "id": id }	
	}).done(function(response){
		console.log(response);
	})
	});
};

// Closing tag
});