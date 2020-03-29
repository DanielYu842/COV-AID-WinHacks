const express = require('express');
const cors = require('cors')
const app = express();
const webRoutes = require('./routes/web');
var bodyParser     =        require("body-parser");

app.use(cors());

// Front Routes handling
app.use(webRoutes);


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.post("/test", async (req,res) => {
    console.log(req.body)
    const result = await returnFilenames(req.body.title)
    .catch(err => console.log(err))
    console.log(result)
    res.send("hi")
})




async function returnFilenames(dir) {
    return extractInfo(await detectTextOCR(dir));
}

async function detectTextOCR(fileName) {
    // Imports the Google Cloud client libraries
    const vision = require('@google-cloud/vision');

    // Creates a client
    const client = new vision.ImageAnnotatorClient();

    // Performs text detection on the gcs file
    const [result] = await client.textDetection(fileName);
    const detections = result.textAnnotations;
    return detections[0].description.split("\n");
}

function extractInfo(list) {
    let name = "";
    let cardNumber = "";
    let birthday = "";
    let issueDate = "";
    let expiryDate = "";
    let gotName = false;
    let gotCardNo = false;
    let gotBirthday = false;

    for (let i = 0; i < list.length; i++) {
        if (2 <= i && i <= 4 && !gotName && !gotCardNo) {
            if (list[i].split(" ").length == 3) {
                name = list[i];
                gotName = true;
            }
        } else if (gotName) { //Card number is right after name
            cardNumber = list[i];
            gotName = false;
            gotCardNo = true;
        } else if (gotCardNo) { //Birthday is after card number
            let trimmedDate = list[i].replace(/-/ig, "").replace(/ /ig, "");
            if (isInteger(trimmedDate)) {
                //birthday = trimmedDate.substring(0, 4) + " " + trimmedDate.substring(4, 6) + " " + trimmedDate.substring(6, 8);
                birthday = trimmedDate;
                gotCardNo = false;
                gotBirthday = true;
            }
        } else if (gotBirthday) { //Issue and expiry dates are after birthday
            let trimmedDate = list[i].replace(/-/ig, "").replace(/ /ig, "");
            if (isInteger(trimmedDate)) {
                //issueDate = trimmedDate.substring(0, 4) + " " + trimmedDate.substring(4, 6) + " " + trimmedDate.substring(6, 8);
                //expiryDate = trimmedDate.substring(8, 12) + " " + trimmedDate.substring(12, 14) + " " + trimmedDate.substring(14, 16);
                issueDate = trimmedDate.substring(0, 8);
                expiryDate = trimmedDate.substring(8, 16);
                break;
            }
        }
    }

    return [name, cardNumber, birthday, issueDate, expiryDate];
}

function isInteger(value) {
    if (parseInt(value, 10).toString() === value) {
        return true
    }
    return false;
}


app.listen(5000);