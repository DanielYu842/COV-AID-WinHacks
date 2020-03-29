import React from 'react';
import {Button} from '@material-ui/core/';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import "./Dashboard.css"
import axios from 'axios';
import { Upload, message } from 'antd';



import UploadContainer from '../containers/UploadContainer';

class Dashboard extends React.Component{
    constructor(){
        super()
        this.state = {
            files : []
        }
        this.handleClick = this.handleClick.bind(this);

    }

    close(){
        this.setState({files : []})
    }

    handleClick(){
        // var fileInput = document.getElementById('file-button')
        // fileInput.addEventListener('change', () => {
        //     var file = document.getElementById("file-button").files[0]
        //     console.log(file.name)
        //     if (file){
        //         this.setState((prevState) => {
        //             return {files : [file.name]}
        //         })
        //     }
        // }, false);
    }
    
    async submit(){
        var file = document.getElementById('file-button').files[0]
        console.log(file)
        console.log(file.value)
        console.log(document.getElementById('file-button').value)
        const data = new FormData() 

        data.append('file', file)

        axios.post("http://localhost:8000/upload", data, { // receive two parameter endpoint url ,form data 
        })
        .then(res => { // then print response status
            console.log(res.statusText)
        })
        }


    info(info){
        const status = info.file;
        console.log(info)
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }

        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }


    render(){
        return(
            <div className="paper" >
                <div className="paper-title">Upload Government Issued ID</div>
                <div className="filler-dashboardd"></div>
                < UploadContainer id="upload-button"/>
                {/*
                <div className="input-files">
                   {this.state.files.map(file => <div className="file-disp"><div className="file-name">{file}</div><div className="filler-dashboardd"/> <div style={{margin: "10px"}} className="close-file" onClick={() => this.close()}>X</div></div>)}   
                </div>*/}
                {/*
                <div className="input-dashboard">                
                    <Button
                    variant="contained"
                    component="label"
                    color="primary"
                    className="upload-button"
                    >
                        <CloudUploadIcon></CloudUploadIcon> <div className="file-upload-text">Upload File</div>
                        <form 
                            name= 'photo'
                            multiple={false}
                            action = 'http://localhost:5000/photo'
                        >
                            <input
                                type="file"
                                style={{ display: "none" }}
                                id="file-button"
                                onClick={() => this.handleClick()}
                                name="document"
                                onChange={(info) => this.info(info)}
                                name= 'photo'
                                multiple={false}
                                action = 'http://localhost:5000/photo'
                            />
                        </form>
                    </Button>
                    <div className="filler-dashboard"></div>
                    <Button className="submit-button"color="primary" onClick={() => this.submit()}>Submit</Button>

                </div>*/}

            </div>
        )
    }
}

export default Dashboard