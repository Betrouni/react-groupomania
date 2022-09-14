import React from "react";
import Button from '@mui/material/Button';
import axios from "axios";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import TextField from '@mui/material/FilledInput';
import myfunctions from '../functions/myfunctions' 
import Upload from "./Upload";



function EditEntry(props) {

  const [editText, setEditText] = React.useState('')

  let cardId = myfunctions.getCardId()

  function handleChange(e){
    setEditText(e.target.value)
  }


  React.useEffect(() => {
    let token = myfunctions.getToken()
    axios
      .get(`http://localhost:8000/api/post/${cardId}`,{
        headers:{
          authorization: token
        }
      })
      .then(function (res) {
      setEditText(res.data.text)

      

      

      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  return (
    <div className="EditMsg-Container">
    <ArrowCircleLeftIcon className='edit-arrow' onClick={props.onSwitch} />
      <h1>Modifier mon post</h1>

      <TextField value={editText} id="filled-basic" label="Filled" variant="filled" onChange={handleChange}
      multiline={true} minRows={5} maxRows={5} />


    <div className='edit-btns'>
    <Button variant="contained" onClick={()=>{
      props.onSend(editText);props.onSwitch()
    }}> Modifier</Button>
    <Button variant="contained" color='warning' onClick={()=>{props.onImageDelete()}}>Supprimer l'image</Button></div>
    <Upload onAdd={props.onUpload} class={"editing-upload"} />
    
    </div>
  );
}

export default EditEntry;
