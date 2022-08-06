import React from "react";
import DoubleArrowRoundedIcon from "@mui/icons-material/DoubleArrowRounded";

const SignIn = (props) => {
  const { email, setEmail } = React.useState();
  const { password, setPassword } = React.useState();

  return (
    <div className=" form-container sign-in-container">
      <form>
        <h1 className="header-signin">Identifiez vous</h1>

        <input
          onChange={props.handleChange}
          name="email"
          type="email"
          placeholder="Email"
        />
        <input
          onChange={props.handleChange}
          name="password"
          type="password"
          placeholder="Password"
        />
        <button onClick={props.sendData}>
          <DoubleArrowRoundedIcon className="arrow" />
        </button>
      </form>
    </div>
  );
};

export default SignIn;
