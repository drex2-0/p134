status="";
objects=[];

function setup()
{
    canvas=createCanvas(640,420);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(640,420);
    video.hide();
    objectDetector=ml5.objectDetector("cocossd",modelloaded);
    document.getElementById("status").innerHTML="status:Detecting Objects";
}

function preload()
{
    img=loadImage('background.jpg');
    
}

function draw()
{
    image(video,0,0,640,420);
    if(status!="")
    {  
        objectDetector.detect(video,gotresults);
        for(i=0;i<objects.length;i++)
        {
            document.getElementById("status").innerHTML="status:Objects Detected";
            
            fill(255,0,0);
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke(255,0,0);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(objects[i].label=="person")
            {
                document.getElementById("Objectnumbers").innerHTML="Baby Found ";
                
            }
            else{
                document.getElementById("Objectnumbers").innerHTML="Baby not found ";
                
            }
            if(objects[i].length=="0")
            {
                document.getElementById("Objectnumbers").innerHTML="Baby not Found ";
                
            }
        }
    }
    
    
    

    }

function modelloaded()
{
    console.log("Model Is Initialized");
    status=true;
    
}

function gotresults(error,results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects=results;
}