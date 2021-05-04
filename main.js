prediction_1="";

Webcam.set({
    width : 350,
    height : 300,
    image_format : 'png',
    png_quality : 100
    });
    camera=document.getElementById("camera");
    Webcam.attach("#camera");
    
function take_snapshot()
{
Webcam.snap(function(data_uri){
document.getElementById("result").innerHTML='<img id="captured_img" src="' + data_uri + '"/>';
});
}
console.log('ml5 version', ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/GRre5EcfK/model.json",modelLoaded);

function modelLoaded()
{
    console.log("Model Loaded!");
}

function speak()
{
    var synth=window.speechSynthesis;
    speakData1="The hand gesture you are currently showing is a " + prediction_1 + "gesture";
    var utterThis=new SpeechSynthesisUtterance(speakData1);
    synth.speak(utterThis)
}

function check_snapshot()
{
img=document.getElementById("captured_img");
classifier.classify(img, gotResult);
}

function gotResult(error,results)
{
if (error)
{
    console.error(error);
}
else
{
    console.log(results);
    document.getElementById("result_emotion_name").innerHTML=results[0].label;
    prediction_1=results[0].label;
    speak();

    if (results[0].label=="Vulcan Salute")
    {
        document.getElementById("update_emoji").innerHTML="&#128406;";
    }

     if (results[0].label=="Hi")
    {
        document.getElementById("update_emoji").innerHTML="&#128075;";
    }

     if (results[0].label=="Thumbs Up")
    {
        document.getElementById("update_emoji").innerHTML="&#128077;";
    }

}

}