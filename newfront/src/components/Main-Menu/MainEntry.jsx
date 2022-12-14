import React from 'react'
import TextField from '@mui/material/TextField'
import Button from "@mui/material/Button";
import Upload from './Upload';

function MainEntry(props){


    function handleChange(e){
        let data = e.target.value
        props.onAdd(data)
        

    }

    return (
<div>
<div className='entry-div'> <TextField onChange={handleChange}  className="main-entry" multiline={true} minRows={6} maxRows={6} /></div>
<div className="send-button"><Button variant="contained" onClick={()=>{props.BtnClick()}} >
          Envoyer 
        </Button>
        <Upload onClick={()=>{props.onUpload()}} class={"ImageUploader"} />
        </div>
         </div>
        
    
    

    )
}

export default MainEntry;