function generateRGBA(){
    r = parseInt(Math.random() * 255)
    g = parseInt(Math.random() * 255)
    b = parseInt(Math.random() * 255)
    return 'rgba(' + r + ',' + g + ',' + b + ',1)';
}

var config = {
            apiKey: "AIzaSyChY6_M8fYAwd2L3NkB9vXxsbFiqiCu6QQ",
            authDomain: "trends-bd671.firebaseapp.com",
            databaseURL: "https://trends-bd671.firebaseio.com",
            storageBucket: "trends-bd671.appspot.com",
            messagingSenderId: "783531718308"
          };
firebase.initializeApp(config);
var database = firebase.database().ref();
update()

function update(){
	database.once('value').then(function(snapshot) {
    var data = snapshot.val()
    var namesList = [] 
    var searchesList = []
    var tweetsList = []
    // var color1 = generateRGBA()
    // var color2 = generateRGBA()
    for (var i = data.length - 1; i >= 0; i--) {
        namesList.push(data[i].name) 
        searchesList.push(parseInt(data[i].amount.replace(",",""))/10000) 
        tweetsList.push(data[i].tweets) 
    }
    var ctx = document.getElementById("myChart");    
    ctx.width = 200;
    ctx.height = 200;
    var data = {
    labels: namesList,
    datasets: [
        {
            label: "Searches (By 10,000)",
            backgroundColor: "red",
            data: searchesList
        },
        {
            label: "Tweets",
            backgroundColor: "blue",
            data: tweetsList
        }
    ]
};

	var myBarChart = new Chart(ctx, {
	    type: 'bar',
	    data: data,
	    options: {
	        barValueSpacing: 20,
            maintainAspectRatio: false,
            responsive: true,
	        scales: {
	            yAxes: [{
	                ticks: {
	                    min: 0,
	                }
	            }]
	        }
	    }
	});
});

}
database.on('state_changed').then(function(snapshot) {
    var data = snapshot.val()
    var namesList = [] 
    var searchesList = []
    var tweetsList = []
    // var color1 = generateRGBA()
    // var color2 = generateRGBA()
    for (var i = data.length - 1; i >= 0; i--) {
        namesList.push(data[i].name) 
        searchesList.push(parseInt(data[i].amount.replace(",",""))/10000) 
        tweetsList.push(data[i].tweets) 
    }
    var ctx = document.getElementById("myChart");    
    ctx.width = 200;
    ctx.height = 200;
    var data = {
    labels: namesList,
    datasets: [
        {
            label: "Searches (By 10,000)",
            backgroundColor: "red",
            data: searchesList
        },
        {
            label: "Tweets",
            backgroundColor: "blue",
            data: tweetsList
        }
    ]
};

	var myBarChart = new Chart(ctx, {
	    type: 'bar',
	    data: data,
	    options: {
	        barValueSpacing: 20,
            maintainAspectRatio: false,
            responsive: true,
	        scales: {
	            yAxes: [{
	                ticks: {
	                    min: 0,
	                }
	            }]
	        }
	    }
	});
});

