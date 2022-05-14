status = "";
objects = [];

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    cocossd = ml5.objectDetector("cocossd", startmodel);
    document.getElementById("status").innerHTML = "Started Detecting Objects";
}

function startmodel() {
    console.log("Model loaded");
    status = "true";
    cocossd.detect(video, getResults);
}

function getResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        objects = results;
    }
}

function draw() {
    image(video, 0, 0, 380, 380);
    if (status != "") {
        for (i = 0; i < objects.length; i++) {
            console.log("abcd");
            document.getElementById("no_of_objs").innerHTML = "Number of Objects: " + objects.length;
            r = floor(random(256));
            g = floor(random(256));
            b = floor(random(256));
            document.getElementById("status").innerHTML = "Status:Objects Detected";
            fill(r, g, b);
            obj_name = objects[i].label;
            obj_per = floor(objects[i].confidence * 100);
            obj_x = objects[i].x;
            obj_y = objects[i].y;
            obj_w = objects[i].width;
            obj_h = objects[i].height;
            textSize(20);
            text(obj_name + " " + obj_per + "%", obj_x, obj_y);
            noFill();
            stroke(r, g, b);
            rect(obj_x, obj_y, obj_w, obj_h);
        }
    }
}