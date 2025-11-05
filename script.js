var lat = "39.55523823932461";
var lon = "-84.20135905787708";
var search_input;

var URL1 = "https://api.tomtom.com/search/2/search/";
var URL1_part_2 = ".json?minFuzzyLevel=1&maxFuzzyLevel=2&view=Unified&relatedPois=all&key=";
var api_key1 = "xxxxxxxxxxxxxxx";

var URL2 = "https://api.openweathermap.org/data/2.5/forecast?lat=";
var api_key2 = "xxxxxxxxxxxxxxxxxxxxxx";

let input;
let input1;
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var dateFirst;



function open(){
    getCoord();
    getWeather();
    


}
window.onload = open;

function buttonSearch(){
    input = document.getElementById("location").value;
   
    input1 = input.replace(/ /g,"%20");

    getCoord();
    
    getWeather();


}

function historySearch(){
    
    $("#queryHistory").append("Oxford Ohio");
    
    $("#dateHistory").append(dateFirst);
    $("#dateHistory").after('<tr><td><button onclick="location.href="weather.html;"">Select</button></td></tr>');


}

function getCoord() {
    a=$.ajax({
        url: URL1 + input1 + URL1_part_2 + api_key1, 
       method: "GET"
    })
    .done(function(data){
        lat = data.results[0].position.lat;
        lon = data.results[0].position.lon;

    }).fail(function(error) {
        console.log("Error getting coordinates");

	});
            
}

function getWeather(){
    a=$.ajax({
        url: URL2 + lat + "&lon=" + lon + "&appid=" + api_key2, 
        method: "GET"
    })
    .done(function(data){
 
        j = 0;
        for(i = 1; i < 6; i++){

            var high = -1000;
            var low = 1000;

            a = "#high" + i;
            $(a).html("");

            for(k = j; k < (j + 8); k++){
                if(data.list[k].main.temp_max > high){
                    high = data.list[k].main.temp_max;
                }
            }

            high = ((high-273)*1.8) + 32;
            high = Math.floor(high);
            $(a).append(high  + "\u00B0");

            b = "#low" + i;
            $(b).html("");

            for(k = j; k < (j + 8); k++){
                console.log(data.list[k].main.temp_min);
                if(data.list[k].main.temp_min < low){
                    low = data.list[k].main.temp_min;

                }
            }


            
            low = ((low-273)*1.8) + 32;
            low = Math.floor(low);
            $(b).append(low + "\u00B0");
            

            c = "#vis" + i;
            $(c).html("");
            vis = data.list[j].weather[0].description;
           
            $(c).append(vis);
            

            d = "#hum" + i;
            $(d).html("");
            hum = data.list[j].main.humidity;
            $(d).append(hum + "%");
    
            e = "#date" + i;
            $(e).html("");
            

            dateFirst = data.list[0].dt_txt;
            dateFirst = dateFirst.substring(5,10);
            dateFirst = dateFirst.replace("-","/");
            dateFirst = dateFirst + "/2022";

            date = data.list[j].dt_txt;
            date = date.substring(5,10);
            date = date.replace("-","/");
            date = date + "/2022";
            $(e).append(date);

            
            f = "#icon" + i;
            icon1 = data.list[j].weather[0].icon;
            var imgIcon = "http://openweathermap.org/img/wn/"+ icon1 + "@2x.png"
            $(f).attr("src", imgIcon);

            g = "#weekday" + i;
            $(g).html("");
            date1 = data.list[j].dt_txt;
            date1 = date1.substring(0,10);
            
            var arr = date1.split("-");
            var x = new Date(date);
            let day = weekday[x.getDay()];
            $(g).append(day);

            j = j + 8;

        
        }

        




    }).fail(function(error){
        console.log("Error with openweathermap api");
    });


}

function weekDayConverter(isoStr1){
    return date1 = new Date(isoStr1);

}



