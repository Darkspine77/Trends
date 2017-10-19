function generateRGBA(){
    r = parseInt(Math.random() * 255)
    g = parseInt(Math.random() * 255)
    b = parseInt(Math.random() * 255)
    return 'rgba(' + r + ',' + g + ',' + b + ',1)';
}

function generateChartColors(values){
    var colors = []
    for (var i = values.length - 1; i >= 0; i--) {
        colors.push(generateRGBA())
    }
    return colors
}

var config = {
    apiKey: "AIzaSyDQGFiuYnsQaF0h1k-BBtXYJWPzvjWY648",
    authDomain: "trends-87e13.firebaseapp.com",
    databaseURL: "https://trends-87e13.firebaseio.com",
    projectId: "trends-87e13",
    storageBucket: "",
    messagingSenderId: "677531030340"
};
firebase.initializeApp(config);
var database = firebase.database().ref();
database.once('value').then(function(snapshot) {
    update(snapshot.val())
})

function displayTrend(trend){
    $(".charts").append("<canvas id='trendData'></canvas>");
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
                backgroundColor: generateChartColors(relatedValues),
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

function update(trends){
    var ctx = document.getElementById("trends");
    ctx.width = window.innerWidth;
    ctx.height = window.innerHeight * 0.8;
    var labels = []
    var searchValues = []
    var tweetValues = []
    for (var x = 0; x < trends.length; x++) {
        labels.push(trends[x].name)
        searchValues.push(parseInt(trends[x].amount))
        tweetValues.push(trends[x].tweets)
    }
    var colors = generateChartColors(labels)
    var graphData = {
        labels: labels,
        datasets: [
            {
                label: "Google Search Values",
                backgroundColor: colors,
                data: searchValues
            },
            {
                label: "Tweet Values",
                backgroundColor: colors,
                data: tweetValues
            }
        ]
    };
    var now = new Date()
    var myPieChart = new Chart(ctx,{
        type: 'pie',
        data: graphData,
        options: {
            responsive: false,
            title: {
                display: true,
                text: ["Current Trends",now.toLocaleDateString(),now.toLocaleTimeString()]
            },
            onClick:function(result,array){
            	if(array[0] != undefined){
	                $('html, body').animate({
	                    scrollTop: $("#trendData").offset().top
	                }, 2000);
	                $("#trendData").remove()
	                displayTrend(trends[array[0]["_index"]])
	            }
            }
        }
    });
    setInterval(function(){
        location.reload()
    }, 60000);
}

