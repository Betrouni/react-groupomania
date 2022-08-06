import React from 'react'
import TextField from '@mui/material/TextField'
import { dividerClasses } from '@mui/material';

function MainEntry(){

    return (

    <div className='entry-div'> <TextField className="main-entry" multiline={true} minRows={6} maxRows={6} /></div>

    )
}

export default MainEntry;