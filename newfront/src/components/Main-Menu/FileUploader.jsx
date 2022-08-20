import React from "react";

export default function Upload(props) {


  function handleChange(e){
    let data = e.target.files
    props.onAdd(data[0])

}


  return (
   <div className='form-group'> <input
        id="file"
        type="file"
        name="file"

        onChange={(e)=>{handleChange(e)}}
        
        className = {props.class}
      />
      <label for="file" className="btn btn-tertiary js-labelFile"></label>
      </div>
     
 
  );
}
