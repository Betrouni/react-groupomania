import React from "react";

export default function Upload(props) {


  function handleChange(e){
    let data = e.target.files
    props.onAdd(data[0])

}


  return (
   
      <input
        id="fileInput"
        type="file"
        name="image"
        onChange={(e)=>{handleChange(e)}}
        
        className = {props.class}
      />
 
  );
}
