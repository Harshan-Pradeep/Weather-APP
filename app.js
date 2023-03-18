const { response } = require("express");
const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app=express();
//use body-parser to get data from html form
app.use(bodyParser.urlencoded({extended:true}));

//handle route get request
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
    
})

//handle post request which is request from html form
app.post("/",(req,res)=>{
    const cityName=req.body.cityName;
    const apiKey="265184471ba0684e14b72898158a5bc6";

    //Get weather data from openWeather API
    const url="https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&lon=0.1276&units=metric&appid="+apiKey+"";
    https.get(url,(response)=>{
        

        response.on("data",(data)=>{
            const weatherData=JSON.parse(data);

            const temp=weatherData.main.temp;
            const description=weatherData.weather[0].description;
            const icon=weatherData.weather[0].icon;
            const imageUrl="https://openweathermap.org/img/wn/"+icon+"@2x.png";

            res.write("<p>"+description+"</p>");
            res.write("<h1>Temperature is "+temp+"</h1>");
            res.write("<img src="+imageUrl+">");
            res.send();
            //console.log(weatherData);
        
        })
    })

})



app.listen(3000,()=>"server is running!")