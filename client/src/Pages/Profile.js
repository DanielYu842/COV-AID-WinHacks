import React from 'react';

class profile extends React.Component{
    render(){
        return(
            <div className="paper" >
                {/*<div className="paper-title">Profile</div>*/}
                <div className="profile-content-div">                
                    <div className="title-profile">Calvin L Gluck </div>
                    <div style={{flex: "1", display: "flex"}}>
                        <div className="profile-details-div">
                            <div className="profile-details">Card Number: 1234 - 567 - 123 - JL</div>
                            <div className="profile-details">Birthday: 1972 - 12 -26</div>
                            <div className="profile-details">Issue Date: 2009 - 02 - 28</div>
                            <div className="profile-details">Expiry Date: 2009 - 11 - 30</div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default profile