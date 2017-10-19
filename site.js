var config = {
    apiKey: "AIzaSyDQGFiuYnsQaF0h1k-BBtXYJWPzvjWY648",
    authDomain: "trends-87e13.firebaseapp.com",
    databaseURL: "https://trends-87e13.firebaseio.com",
    projectId: "trends-87e13",
    storageBucket: "",
    messagingSenderId: "677531030340"
};
firebase.initializeApp(config);
var colors = ["rgba(230, 25, 75,1)","rgba(60, 180, 75,1)","rgba(255, 225, 25,1)","rgba(0, 130, 200,1)","rgba(245, 130, 48,1)","rgba(145, 30, 180,1)","rgba(70, 240, 240,1)","rgba((240, 50, 230,1)","rgba(210, 245, 60,1)","rgba(250, 190, 190,1)","rgba(0, 128, 128,1)","rgba(230, 190, 255,1)","rgba(170, 110, 40,1)","rgba((255, 250, 200,1)","rgba(128, 0, 0,1)","rgba(170, 255, 195,1)","rgba(128, 128, 0,1)","rgba(255, 215, 180,1)","rgba(0, 0, 128,1)","rgba(128, 128, 128,1)"]
var database = firebase.database().ref();
database.once('value').then(function(snapshot) {
    update(snapshot.val().data)
})

database.on('child_changed', function(a) {
    $('html, body').animate({
        scrollTop: $("#trends").offset().top
    }, 1000);
    update(a.val())
})

function displayTrend(trend){
    var ctx = document.getElementById("trendData");
    ctx.width = window.innerWidth;
    ctx.height = 400;
    var labels = []
    var relatedValues = []
    for (var x = 0; x < trend.related.length; x++) {
        labels.push(trend.related[x].title + " - " + trend.related[x].type)
        relatedValues.push(trend.related[x].value)
    }
    var graphData = {
        labels: labels,
        datasets: [
            {
                label: "Related Terms",
                backgroundColor: colors,
                data: relatedValues
            }
        ]
    };  
    var myPieChart = new Chart(ctx,{
        type: 'pie',
        data: graphData,
        options: {
            responsive: false,
            title: {
                display: true,
                text: [trend.name,"Tweets: " + trend.tweets]
            },
            onClick:function(result,array){
                window.open("https://www.google.com/search?q=" + trend.name + " " + trend.related[array[0]["_index"]].title + "&tbm=nws")
            }
        }
    });
}

function update(db){
    $("#trends").remove()
    $("#trendData").remove()
    $(".charts").append("<canvas id='trends'></canvas>");
	var trends = db.trends
    var timestamp = new Date(db.timestamp)
    var ctx = document.getElementById("trends");
    ctx.width = window.innerWidth;
    ctx.height = window.innerHeight * 0.8;
    trends.sort(function(a, b) {
	    return parseFloat(a.amount) - parseFloat(b.amount);
	});
    var labels = []
    var searchValues = []	
    var tweetValues = []
    for (var x = trends.length - 1; x >= 0; x--) {
        labels.push(trends[x].name)
        searchValues.push(parseInt(trends[x].amount))
        tweetValues.push(trends[x].tweets)
    }
    var graphData = {
        labels: labels,
        datasets: [
            {
                label: "Google Search Values",
                backgroundColor: colors	,
                data: searchValues
            },
            {
                label: "Tweet Values",
                backgroundColor: colors,
                data: tweetValues
            }
        ]
    };
    var myPieChart = new Chart(ctx,{
        type: 'pie',
        data: graphData,
        options: {
            responsive: false,
            title: {
                display: true,
                text: ["Current Trends","Last Updated",timestamp.toLocaleDateString(),timestamp.toLocaleTimeString()]
            },
            onClick:function(result,array){
            	if(array[0] != undefined){
//                    $("#trendData").remove()
//                    $(".charts").append("<canvas id='trendData'></canvas>");
//	                $('html, body').animate({
//	                    scrollTop: $("#trendData").offset().top
//	                }, 1000);
//	                displayTrend(trends[array[0]["_index"]])
                    var trend = labels[array[0]["_index"]]
                    window.open("https://www.google.com/search?q=" + trend)
	            }
            }
        }
    });
}

