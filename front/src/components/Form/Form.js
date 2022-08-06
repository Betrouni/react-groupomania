import React, { useState } from "react";
import SignUp from "./signUp";
import SignIn from "./signIn";
import OverLay from "./overLay";
import axios from 'axios';
import "./styles.css";




function Form(){

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

  function ping(e){
    e.preventDefault()
    console.log(formData)
    console.log('ping !!!')
  }

  function sendToSignup(e){
    e.preventDefault()
    console.log('requête envoyée')
    axios.post('http://localhost:8000/api/auth/signup', formData)
    .then(res => console.log(res));
  }

  function sendToLogin(e){
    e.preventDefault()
    console.log('requête envoyée')
    axios.post('http://localhost:8000/api/auth/login', formData)
    .then(res => console.log(res));
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

 