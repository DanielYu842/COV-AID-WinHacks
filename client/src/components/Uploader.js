import React from 'react'
import styled from 'styled-components'
import { Upload, message } from 'antd';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {Button} from '@material-ui/core/';


const { Dragger } = Upload;

const Container = styled.div`
    width: 100%;
    height: 100%;
`




const Uploader = () => {

    const props = {
        name: 'photo',
        multiple: false,
        action: 'http://localhost:5000/photo',
        async onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log("THIS IS THE FILE DATA THAT WE'VE EXTRACTED THROUGH THE NODE SERVER", info.file, info.fileList)
            }

            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
                console.log("THIS IS THE FILE PATH RELATIVE TO THE NODE SERVER", info.file.response.image)
                const filePath = info.file.response.image
                const response = await fetch("http://localhost:5000/test", {
                    method: 'POST', 
                    headers: { 'Content-Type': 'application/json' },
                    body : JSON.stringify({ title: filePath })
                })
                const result = await response.text()
                console.log("THIS IS THE IMPORTANT INFORMATION THAT HAS BEEN EXTRACTED FROM THE GOVERNMENT ISSUED ID", result)


                const response2 = await fetch("http://localhost:5000/1", {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json' },
                    body : JSON.stringify({ id: result })
                })
                const result2 = await response2.text()
                console.log("THIS IS THE RESPONSE THAT DETERMINES VALIDITY OF AN APPLICANT'S PROFILE", result2)

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