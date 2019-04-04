var animals = [
{name:'Parappa', type:'dog', status:'Inactive', feed:'gifs/corgi.gif', audio:'audio/dog.mp3'},
{name:'Meowth', type:'cat', status:'Inactive', feed:'gifs/cat.gif', audio:'audio/cat.wav'},
{name:'Kazooie', type:'bird', status:'Inactive', feed:'gifs/cockatie.gif', audio:'audio/bird.mp3'},
{name:'Daxter', type:'ferret', status:'Inactive', feed: 'gifs/ferret.gif'},
{name:'Gex', type:'lizard', status:'Inactive', feed: 'gifs/lizard.gif'},
{name:'Diddy Kong', type:'monkey', status:'Inactive', feed: 'gifs/monkey.gif', style: 'object-fit:cover', audio:'audio/monkey.wav'},
{name:'Pepper', type:'rabbit', status:'Inactive', feed: 'gifs/rabbit.gif'}
];

var initialLoad = function(){
for(var x = 0; x < animals.length;x++){
localStorage.setItem(animals[x].name, JSON.stringify(animals[x]));
}
}()

var loadLocalStorage = function () {
	var keys = Object.keys(localStorage)
	var htmlString = '';
	var htmlString2 = '';
	for (var i = 0; i < keys.length; i++) {
		htmlString += `<tr><td>${keys[i]}</td><td>${JSON.parse(localStorage[keys[i]]).type}</td><td>${JSON.parse(localStorage[keys[i]]).status}</td></tr>`;
	}
	$('tbody').html(htmlString);
	for(var j = 0; j < keys.length;j++){
		if(JSON.parse(localStorage[keys[j]]).status === 'Active'){
		htmlString2 += '<img src="' + JSON.parse(localStorage[keys[j]]).feed + '" style="width:300px;height:300px;' + (JSON.parse(localStorage[keys[j]]).hasOwnProperty('style')? JSON.parse(localStorage[keys[j]]).style: '')+'">';
		}
	}
	$('#animalfeeds').html(htmlString2);
};

var updateStatusLabel = function(message) {
	$('#statusLabel').text('Status: ' + message);
}

 //jQuery document ready initialization stuff
 ////button and form event handlers
 // logic for determining action probably needs to go in the event handler
$(document).ready(function () {
	loadLocalStorage();

	$('#btn-invite').on('click', function(e) {
		var name = $('#name').val();
		if(localStorage.hasOwnProperty(name)){
		updateStatusLabel(name + ' added to call');
		var temp = JSON.parse(localStorage[name]);
		temp.status = 'Active';
		localStorage.setItem(name, JSON.stringify(temp));
		}else{
			updateStatusLabel('animal does not exist');
		}

		loadLocalStorage();
	});
		$('#btn-remove').on('click', function(e){
			var name = $('#name').val();
			if(localStorage.hasOwnProperty(name)){
				if(JSON.parse(localStorage[name]).status === 'Active'){
					var temp = JSON.parse(localStorage[name]);
					temp.status ='Inactive';
					localStorage.setItem(name, JSON.stringify(temp));
					updateStatusLabel(name + ' removed from call');
				}else{
					updateStatusLabel(name + ' is not in call');
				}
			}else{
				updateStatusLabel('animal does not exist');
			}
			loadLocalStorage();
		})

/**	$('#btn-update').on('click', function(e) {
		var key = $('#key').val();
		var value = $('#value').val();
		var existingValue = localStorage.getItem(key)
		var keyExists = existingValue !== null;

		if (value === existingValue) {
			updateStatusLabel('key not updated - that value already exists silly! xD')
		} else if (keyExists) {
			updateEntry(key, value);
			updateStatusLabel('key updated - ' + key);
		} else if (key === '') {
			updateStatusLabel('invalid input!')
		} else {
			updateStatusLabel('key doesn\'t exist, please use create button instead! :D');
		}		
		
		loadLocalStorage();		
	});

	$('#btn-delete').on('click', function(e) {
		var key = $('#key').val();
		var value = $('#value').val();
		var keyExists = localStorage.getItem(key) !== null;

		if (keyExists) {
			removeEntry(key);
			updateStatusLabel('key removed - ' + key);
		} else if (key === '') {
			updateStatusLabel('invalid input!')
		} else {
			updateStatusLabel('key doesn\'t exist, nothing removed. :|');
		}

		loadLocalStorage();
	});	
**/
});
/*



When an input element is given a name, that name becomes a property of the owning form element's HTMLFormElement.elements property. That means if you have an input whose name is set to guest and another whose name is hat-size, the following code can be used:

let form = document.querySelector("form");
let guestName = form.elements.guest;
let hatSize = form.elements["hat-size"];
*/

/*
PAGE CONTENT STUFF
*/
//something to update the table every time localStorage changes

//localStorage stuff
//https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
////create new entry
//localStorage.setItem(key, value)
var createEntry = function(key, value) {
	return localStorage.setItem(key, value);
}

////Update existing entry
//localStorage.setItem(key, value)
var updateEntry = function(key, value) {
	return localStorage.setItem(key, value);
}

////delete existing entry
//localStorage.removeItem(key)
var removeEntry = function(key) {
	return localStorage.removeItem(key);
}
