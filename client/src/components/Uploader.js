import React from 'react'
import styled from 'styled-components'
import { Upload, message } from 'antd';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {Button} from '@material-ui/core/';
import path from 'path';
import fs from 'fs';

const { Dragger } = Upload;

const Container = styled.div`
    width: 100%;
    height: 100%;
`



function returnFilenames(dir) {
    //requiring path and fs modules

    //joining path of directory 
    const directoryPath = path.join(__dirname, dir);
    //passsing directoryPath and callback function
    var fileList = [];
    console.log(directoryPath)
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
                birthday = parseInt(trimmedDate, 10);
                gotCardNo = false;
                gotBirthday = true;
            }
        } else if (gotBirthday) { //Issue and expiry dates are after birthday
            let trimmedDate = list[i].replace(/-/ig, "").replace(/ /ig, "");
            if (isInteger(trimmedDate)) {
                //issueDate = trimmedDate.substring(0, 4) + " " + trimmedDate.substring(4, 6) + " " + trimmedDate.substring(6, 8);
                //expiryDate = trimmedDate.substring(8, 12) + " " + trimmedDate.substring(12, 14) + " " + trimmedDate.substring(14, 16);
                issueDate = parseInt(trimmedDate.substring(0, 8), 10);
                expiryDate = parseInt(trimmedDate.substring(8, 16), 10);
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

const Uploader = () => {

    const props = {
        name: 'photo',
        multiple: false,
        action: 'http://localhost:5000/photo',
        async onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }

            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
                console.log(info.file.response.image)
                const response = await returnFilenames(info.file.response.image)
                console.log(response)
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };








    return (
        <Container>
            <Dragger {...props}>
            <Button
                    variant="contained"
                    component="label"
                    color="primary"
                    className="upload-button"
                    >
                        <CloudUploadIcon></CloudUploadIcon> <div className="file-upload-text">Upload File</div>
                    </Button>
            </Dragger>
        </Container>
    )
}

export default Uploader;