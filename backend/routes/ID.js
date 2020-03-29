const express = require('express');
const router = express.Router();

let ID = require('../models/governmentIDs');

function returnFilenames(dir) {
    //requiring path and fs modules
    const path = require('path');
    const fs = require('fs');
    //joining path of directory 
    const directoryPath = path.join(__dirname, dir);
    //passsing directoryPath and callback function
    var fileList = [];
    fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        //listing all files using forEach
        files.forEach(async function (file) {
            // Do whatever you want to do with the file
            const list = await detectTextOCR("testImages/" + file);
            console.log(extractInfo(list));
            //console.log(list);
        });
    });
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
                gotCardNo = false;
                gotBirthday = true;
            }
        } else if (gotBirthday) { //Issue and expiry dates are after birthday
            let trimmedDate = list[i].replace(/-/ig, "").replace(/ /ig, "");
            if (isInteger(trimmedDate)) {
                //issueDate = trimmedDate.substring(0, 4) + " " + trimmedDate.substring(4, 6) + " " + trimmedDate.substring(6, 8);
                //expiryDate = trimmedDate.substring(8, 12) + " " + trimmedDate.substring(12, 14) + " " + trimmedDate.substring(14, 16);
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




router.get('/status', (req, res) => {
    const { doneList } = req.query;
    console.log(doneList);
    ID.findOne({ _id: { $nin: JSON.parse(doneList) } })
      .then(ID => res.send(ID))
      .catch(err => res.status(500).send(err));
});

router.get('/:id', (req, res) => {
    ID.findOne({ _id: req.params.id })
        .then(id => res.send(id))
        .catch(err => res.status(500).send(err))
});

router.get('/', (req, res) => {
    ID.find()
        .then(IDs => res.send(IDs))
        .catch(err => res.status(500).send(err));
});     

module.exports = router;
