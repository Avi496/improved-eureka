var prediction="";
Webcam.set({
    width:310,
    height:300,
    img_format:"png",
    png_quality:90
});
var camera=document.getElementById("camera");
Webcam.attach(camera);
function snapshot(){
    Webcam.snap(function (data){
        document.getElementById("result").innerHTML="<img id='iAmImg' src='"+data+"'>";
    });
}
console.log("ml5 version", ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/Xi5Qxly2I/model.json", modelLoaded);
function modelLoaded(){
    console.log("model has been loaded. please leave this website.");
}
function speak(){
    var synth=window.speechSynthesis;
    var speakdata="The Prediction is "+prediction;
    var utterThis=new SpeechSynthesisUtterance(speakdata);
    synth.speak(utterThis);
}
function rediction(){
    img=document.getElementById("iAmImg");
    classifier.classify(img, gotResult);
}
function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML=results[0].label;
        prediction=results[0].label;
        speak();
        if(prediction=="Victory"){
            document.getElementById("result_gesture").innerHTML="&#9996;";
        }
        if(prediction=="Thumbs Up"){
            document.getElementById("result_gesture").innerHTML="&#128077;";
        }
        if(prediction=="Thumbs Down"){
            document.getElementById("result_gesture").innerHTML="&#128078;";
        }
        if(prediction=="Perfect"){
            document.getElementById("result_gesture").innerHTML="&#128076;";
        }
    }
}