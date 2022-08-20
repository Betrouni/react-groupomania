import React from "react";
import Menu from "./components/Main-Menu/Menu";
import "./normalize.css";
import Form from "./components/Form/Form";



function App() {
  const [isLogged, setIsLogged] = React.useState(true);

  return (
<div>
{isLogged === false ? <Form onLogg={ ()=>{setIsLogged(!isLogged)}} /> : <Menu onLogout= { ()=>{setIsLogged(!isLogged)}} />  }

</div>
  )
}

export default App;
