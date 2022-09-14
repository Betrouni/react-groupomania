import React from "react";
import MainEntry from "./MainEntry";
import "./styles.css";
import RecipeReviewCard from "./Card";
import axios from "axios";
import EditEntry from "./EditEntry";
import LogoutIcon from "@mui/icons-material/Logout";
import myfunctions from '../functions/myfunctions' 

function Menu(props) {
  const [msgState, setMsgState] = React.useState();
  const [imgState, setImgState] = React.useState();
  const [postList, setPostList] = React.useState([]);
  const [isEditing, setIsEditing] = React.useState(false);
  const [isImageEdited, setIsImageEdited] = React.useState(false)




  function switchtoEdit() {
    setIsEditing(!isEditing);
    if (isEditing === true) {
      window.location.reload(false);
    }
  }




  function clickTheButton() {
    let userId = myfunctions.getUserId();
    let userEmail = myfunctions.getUserEmail()
    const formData = new FormData();
    formData.append("text", msgState);
    formData.append("myFile", imgState);

    formData.append("userId", userId);
    formData.append('email', userEmail)
    myfunctions.sendToAPI(formData);
    console.log(postList);
  }
  function clickTheEditButton(a) {
    let userId = myfunctions.getUserId();
    const formData = new FormData();
    formData.append("text", a);
    if (isImageEdited === true ){  formData.append("signal", "suppression")}

    formData.append("myFile", imgState)
 
    formData.append("userId", userId);
    myfunctions.sendToEditAPI(formData);
  }
  function clickTheLikeButton(b) {
    let userId = myfunctions.getUserId();
    const formData = new FormData();
    formData.append("like", b);
    formData.append("userId", userId);

    myfunctions.sendToLikeAPI(formData);
  }


  function manageLike(likes, dislikes, id) {
    if (likes.includes(id)) {
      return "isLiked";
    } else if (dislikes.includes(id)) {
      return "isDisliked";
    } else {
      return "neutral";
    }
  }

  React.useEffect(() => {
    let token = myfunctions.getToken()
    axios
      .get("http://localhost:8000/api/post",{
        headers:{
          authorization: token
        }
      })
      .then(function (res) {
        // handle success
        // console.log(res.data)
        // setPostList(res.data)
        setPostList(res.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  return (
    <div>
      {isEditing === true ? (
        <div>
          <EditEntry
          onUpload={setImgState}
            onSwitch={() => {
              switchtoEdit();
            }}
            onSend={clickTheEditButton}
            onImageDelete={()=>{setImgState('');setIsImageEdited(true)}}
          />
          {/* <Upload onAdd={setImgState} class={"editing-upload"} /> */}
        </div>
      ) : (
        <div className="menu-container">
          {/* <div className="left-menu"></div> */}
          <div className="main-menu">
            <div className="main-menu-top">
              {postList.map((i) => {
                return (
                  <RecipeReviewCard
                    onSwitch={() => {
                      switchtoEdit();
                      myfunctions.setCardId(i._id);
                    }}
                    onBean={()=>{ myfunctions.sendToDeleteAPI(i._id); window.location.reload(false);}}
                    content={i.text}
                    imgURL={i.imageURL}
                    email={i.userEmail}
                    id={i._id}
                    userId={i.userId}
                    likeAmount={i.usersLiked.length}
                    dislikeAmount={i.usersDisliked.length}
                    likeManager={manageLike(
                      i.usersLiked,
                      i.usersDisliked,
                      myfunctions.getUserId()
                    )}
                    authManager={myfunctions.isAuthor(i)}
                    onSend={(a) => {
                      console.log(i._id);
                      myfunctions.setCardId(i._id);
                      clickTheLikeButton(a);
                      window.location.reload(false);
                    }}
                  />
                );
              })}
            </div>
            <div className="main-menu-bot">
             
              <MainEntry onUpload={setImgState} onAdd={setMsgState} BtnClick={()=>{window.location.reload(false);clickTheButton()}} />
            </div>
          </div>

          <div className="right-menu">
          <img className='logo-group' src="https://res.cloudinary.com/essenceo/image/upload/v1662655826/icon-left-font-monochrome-white_ock2z2.png" alt="Logo" />;
            <LogoutIcon onClick={props.onLogout} className="logout-icon" />
          </div>
        </div>
      )}
    </div>

  
  );
}

export default Menu;
