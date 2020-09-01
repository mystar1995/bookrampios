import React from 'react';
import Logo from '../img/logo.png';
class FirstPage extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return (
            <div className="chat-window-wrapper">
                <div className="logo_container">
                    <img src={Logo}/>
                </div>
                <div className="loginbtn_container">
                    <button className="btn login" onClick={()=>this.props.history.push('/chat')}>初めての方はこちら</button>
                    <button className="btn signup" onClick={()=>this.props.history.push('/signin')}>既に利用中の方はこちら</button>
                </div>
            </div>
        )
    }
}

export default FirstPage;