import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import myfunctions from '../functions/myfunctions' 



export default function RecipeReviewCard(props) {



  

  React.useEffect(() => {
    let cardId = myfunctions.getCardId()
    let userId = myfunctions.getUserId()
    let token = myfunctions.getToken()
    axios
      .get(`http://localhost:8000/api/post/${cardId}`,{
        headers:{
          authorization: token
        }
      })
      .then(function (res) {

      if ( res.data.usersLiked.includes(userId)){
      }
      

      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  return (
    <Card sx={{ maxWidth: 345 } } className='postCard'>
    {props.authManager ? <div><CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            
          </Avatar>
        }
        action={ 
          <div>
          <IconButton aria-label="settings" onClick={props.onSwitch} >
            <EditIcon />
          </IconButton>
          <IconButton  onClick={props.onBean}>
            <DeleteIcon  />
          </IconButton>
          </div>
        }
        title={props.email}
        // subheader="September 14, 2016"
      /> 
       
      </div>
      : <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            
          </Avatar>
        }
       
        title={props.email}
        // subheader="September 14, 2016"
      /> }
      
      
      <CardMedia
        component="img"
        height="194"
        image={props.imgURL}
        // alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary"  >
         {props.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        

        {props.likeManager === 'isLiked' && 
        <div><IconButton aria-label="add to favorites">
        {props.likeAmount} <ThumbUpAltIcon color='success' onClick={()=>{props.onSend(0)}} /></IconButton>

        <IconButton aria-label="add to favorites">
        {props.dislikeAmount}<ThumbDownAltIcon color='disabled'/>
        </IconButton></div>}




        {props.likeManager === 'neutral' && 
        <div><IconButton aria-label="add to favorites">
        {props.likeAmount}<ThumbUpOffAltIcon  onClick={()=>{props.onSend(1)}} /></IconButton>

        <IconButton aria-label="add to favorites">
        {props.dislikeAmount}<ThumbDownOffAltIcon  onClick={()=>{props.onSend(-1)}} />
        </IconButton></div>}

        {props.likeManager === 'isDisliked' && 
        <div><IconButton aria-label="add to favorites">
        {props.likeAmount}<ThumbUpAltIcon color='disabled'  /></IconButton>

        <IconButton aria-label="add to favorites">
        {props.dislikeAmount}<ThumbDownAltIcon color='error' onClick={()=>{props.onSend(0)}} />
        </IconButton></div>}

     
        
{/*          
         <IconButton aria-label="add to favorites">

        {props.likeManager === 'isDisliked' ? <ThumbDownAltIcon onClick={()=>{props.onSend(-1)}}/> : }
         
         
      
        </IconButton> */}
      </CardActions>
   
    </Card>
  );
}
