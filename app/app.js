var animals = [
{name:'Parappa', type:'dog', status:'Inactive', feed:'gifs/corgi.gif', audio:'audio/dog.mp3', mute:'no'},
{name:'Meowth', type:'cat', status:'Inactive', feed:'gifs/cat.gif', audio:'audio/cat.wav', mute:'no'},
{name:'Kazooie', type:'bird', status:'Inactive', feed:'gifs/cockatie.gif', audio:'audio/bird.mp3', mute:'no'},
{name:'Daxter', type:'ferret', status:'Inactive', feed: 'gifs/ferret.gif'},
{name:'Gex', type:'lizard', status:'Inactive', feed: 'gifs/lizard.gif'},
{name:'Diddy Kong', type:'monkey', status:'Inactive', feed: 'gifs/monkey.gif', style: 'object-fit:cover', audio:'audio/monkey.wav', mute:'no'},
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
		htmlString += `<tr><td>${keys[i]}</td><td>${JSON.parse(localStorage[keys[i]]).type}</td><td>${JSON.parse(localStorage[keys[i]]).status}</td><td>${(JSON.parse(localStorage[keys[i]]).hasOwnProperty('audio')?'Yes' : 'No')}</td></tr>`;
	}
	$('tbody').html(htmlString);
	for(var j = 0; j < keys.length;j++){
		if(JSON.parse(localStorage[keys[j]]).status === 'Active'){
		htmlString2 += '<img src="' + JSON.parse(localStorage[keys[j]]).feed + '" style="width:300px;height:300px;' + (JSON.parse(localStorage[keys[j]]).hasOwnProperty('style')? JSON.parse(localStorage[keys[j]]).style: '')+'">';
		htmlString2 += (JSON.parse(localStorage[keys[j]]).hasOwnProperty('audio')? '<audio src="' + JSON.parse(localStorage[keys[j]]).audio + '" loop autoplay' + (JSON.parse(localStorage[keys[j]]).mute ==='yes'? ' muted': '' ) + '></audio>' : '');
		}
	}
	$('#feedcontainer').html(htmlString2);
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
		});
		$('#btn-mute-toggle').on('click', function(e){
			var name = $('#name').val();
			if(localStorage.hasOwnProperty(name)){
				if(JSON.parse(localStorage[name]).hasOwnProperty('audio')){
						updateStatusLabel(name + ' has been ' + (JSON.parse(localStorage[name]).mute ==='yes'? "unmuted": "muted"));
						var temp = JSON.parse(localStorage[name]);
						temp.mute = (temp.mute === 'yes'? 'no': 'yes');
						localStorage.setItem(name, JSON.stringify(temp));
				}else{
				updateStatusLabel('animal has no audio');
				}
			}else{
			updateStatusLabel('animal does not exist');
			}
		loadLocalStorage();
		})
		$()

});
