import React from 'react';
import {Button} from '@material-ui/core/';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import "./Dashboard.css"




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
        var fileInput = document.getElementById('file-button')
        fileInput.addEventListener('change', () => {
            var file = document.getElementById("file-button").files[0]
            console.log(file.name)
            if (file){
                this.setState((prevState) => {
                    return {files : [file.name]}
                })
            }
        }, false);
    }
    
    submit(){
        var file = document.getElementById('file-button').files[0]
        console.log(file)
    }
    render(){
        return(
            <div className="paper" >
                <div className="paper-title">Upload Government Issued ID</div>
                <div className="input-files">
                   {this.state.files.map(file => <div className="file-disp"><div className="file-name">{file}</div><div className="filler-dashboardd"/> <div style={{margin: "10px"}} className="close-file" onClick={() => this.close()}>X</div></div>)}   
                </div>
                <div className="input-dashboard">                
                    <Button
                    variant="contained"
                    component="label"
                    color="primary"
                    className="upload-button"
                    >
                        <CloudUploadIcon></CloudUploadIcon> <div className="file-upload-text">Upload File</div>
                        <input
                            type="file"
                            style={{ display: "none" }}
                            id="file-button"
                            onClick={() => this.handleClick()}
                        />
                    </Button>
                    <div className="filler-dashboard"></div>
                    <Button className="submit-button"color="primary" onClick={() => this.submit()}>Submit</Button>
                </div>

            </div>
        )
    }
}

export default Dashboard