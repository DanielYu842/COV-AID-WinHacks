import React from 'react';
import {Button} from '@material-ui/core'
class Information extends React.Component{
    render(){
        return(
            <div className="paper" >
                <div className="paper-title">Information</div>
                <Button
                  variant="contained"
                  component="label"
                  color="primary"
                  className="logout-button"     
                  backgroundColor="red"        
                  style={{marginTop: "15%"}}     
                  >
                    <div className="receievePayment">Click for More Information</div>
                </Button>
            </div>
        )
    }
}

export default Information