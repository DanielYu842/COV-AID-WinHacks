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
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }

            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
                console.log(info)
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