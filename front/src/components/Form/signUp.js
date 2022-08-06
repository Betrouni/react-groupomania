import React from "react";
import DoubleArrowRoundedIcon from '@mui/icons-material/DoubleArrowRounded';

const SignUp = (props) => {

  const {email, setEmail} = React.useState()
  const {password, setPassword} = React.useState()

  return (
    <div className="form-container sign-up-container">
      <form>
        <h1 className="header-signin">Inscription</h1>
       
        <span>utilisez votre email comme identifiant</span>
        <input onChange={props.handleChange} value={email} name='email' type="email" placeholder="Email" />
        <input onChange={props.handleChange} value={password} name='password' type="password" placeholder="Mot de Passe" />
        <button onClick={props.sendData}> <DoubleArrowRoundedIcon className="arrow"/> </button>
      </form>
    </div>
  );
};

export default SignUp;
