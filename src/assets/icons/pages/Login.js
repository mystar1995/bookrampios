import React from 'react';
import {Input,Form,FormGroup} from 'reactstrap';
import Logo from '../img/logo.png';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';

class Login extends React.Component
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
                <Form className="loginbtn_container">
                    <FormGroup>
                        <Input type="text" name="username" placeholder="名前" style={{borderRadius:'30px',paddingLeft:'20px'}} autoComplete="off"></Input>
                    </FormGroup> 
                    <FormGroup>
                        <Input type="text" name="password" placeholder="電話番号" style={{borderRadius:'30px',paddingLeft:'20px'}} autoComplete="off"></Input>
                    </FormGroup>
                    <FormGroup style={{display:'flex'}}>
                        <button className="login_btn"><FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon></button>
                    </FormGroup>
                </Form>
            </div>)
    }
}

export default Login;