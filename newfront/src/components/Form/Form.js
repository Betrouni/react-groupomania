import React, { useState } from "react";
import SignUp from "./signUp";
import SignIn from "./signIn";
import OverLay from "./overLay";
import axios from 'axios';
import myfunctions from '../functions/myfunctions' 
import "./styles.css";




function Form(props){

const [toggleClassName, setClassName] = useState("container");

const  [formData, setFormData]  = React.useState();

function handleChange(event) {
  const { name, value } = event.target;

  setFormData(prevValues => {
    return {
      ...prevValues,
      [name]: value
    };
  });
}


  function sendToSignup(e){
    e.preventDefault()
    axios.post('http://localhost:8000/api/auth/signup', formData)
  
  }

  function sendToLogin(e){
    e.preventDefault()
    axios.post('http://localhost:8000/api/auth/login', formData)
    .then((res) => {
      if ( res.data.message === 'user connected' ){
        myfunctions.setToken(res.data.token)
        myfunctions.setUserId(res.data.userId)
        myfunctions.setUserEmail(res.data.email)
        localStorage.setItem("isAdmin", JSON.stringify(res.data.isAdmin))
        props.onLogg()
      }
    });
  }

  function onClick() {
    if (toggleClassName === "container") {
      setClassName("container right-panel-active");
    } else {
      setClassName("container");
    }
  }

  return (
    <div className="App">
      <div className={toggleClassName}>
        <SignIn sendData={sendToLogin} handleChange={handleChange} />
        <SignUp sendData={sendToSignup} handleChange={handleChange} />
        <OverLay onClick={onClick} />
      </div>
    </div>
  );
// return <h1>hello world from Form</h1>
}

export default Form;

 