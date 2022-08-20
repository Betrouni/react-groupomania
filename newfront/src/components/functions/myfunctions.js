const axios = require('axios')

function setToken(token) {
  localStorage.setItem(`token`, JSON.stringify(token));
}

function getToken() {
  if (localStorage.getItem("token")) {
    return JSON.parse(localStorage.getItem("token"));
  }
}

function setUserId(id) {
  localStorage.setItem(`userId`, JSON.stringify(id));
}

function getUserId() {
  if (localStorage.getItem("userId")) {
    return JSON.parse(localStorage.getItem("userId"));
  }
}

function setCardId(cardId) {
  localStorage.setItem(`cardId`, JSON.stringify(cardId));
}

function getCardId() {
  if (localStorage.getItem("cardId")) {
    return JSON.parse(localStorage.getItem("cardId"));
  }
}

function setUserEmail(userEmail) {
  localStorage.setItem(`userEmail`, JSON.stringify(userEmail));
}

function getUserEmail() {
  if (localStorage.getItem("userEmail")) {
    return JSON.parse(localStorage.getItem("userEmail"));
  }
}

function IsAdmin() {
  
 if (JSON.parse(localStorage.getItem("isAdmin")) === true ){
  return true
 }
 else {return false}

}


function isAuthor(post) {
  if (getUserId() === post.userId || IsAdmin() ){
    return true;
  }
}

function sendToAPI(dataPackage) {
  let token = getToken();
  axios
  .post("http://localhost:8000/saveReactPost", dataPackage,{
    headers:{
      authorization: token
    }
  })
  .then((res) => console.log(res));
}

function sendToEditAPI(dataPackage) {
  let cardId = getCardId();
  let token = getToken();

  axios
    .put(`http://localhost:8000/api/post/${cardId}`, dataPackage,{
      headers:{
        authorization: token
      }
    })
    .then((res) => console.log(res));
}

function sendToLikeAPI(dataPackage) {
  let cardId = getCardId()
  let token = getToken()

  axios
    .post(`http://localhost:8000/api/post/${cardId}/like`, dataPackage,{
      headers:{
        authorization: token
      }
    })
    .then((res) => console.log(res));
}


function sendToDeleteAPI(input) {
  let token = getToken()
  axios
    .delete(`http://localhost:8000/api/post/${input}`,{
      headers:{
        authorization: token
      }
    })
    .then((res) => console.log(res));
}

module.exports.setToken = setToken;
module.exports.getToken = getToken;

module.exports.setUserId = setUserId;
module.exports.getUserId = getUserId;

module.exports.setCardId = setCardId;
module.exports.getCardId = getCardId;

module.exports.setUserEmail = setUserEmail;
module.exports.getUserEmail = getUserEmail;

module.exports.IsAdmin = IsAdmin;

module.exports.isAuthor = isAuthor;

module.exports.sendToAPI = sendToAPI;
module.exports.sendToEditAPI = sendToEditAPI;
module.exports.sendToLikeAPI = sendToLikeAPI;
module.exports.sendToDeleteAPI = sendToDeleteAPI;
