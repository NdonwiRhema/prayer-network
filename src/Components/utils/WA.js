import axios from "axios";
import URLDETAILS from "./Params";


export const Authenticate = ()=>{
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var urlencoded = new URLSearchParams();
urlencoded.append("token",URLDETAILS.TOKEN);


var requestOptions = {
  method: 'GET',
  headers: myHeaders, 
  redirect: 'follow'
};

 return fetch(`https://api.ultramsg.com/${URLDETAILS.INSTANCE_ID}/instance/qr?` + urlencoded, requestOptions)
  

}
export const StatusCheck =()=>{
    var params= {
        "token": "4l6v9zt25x8obfjq"
    };
    var config = {
        headers: {  
          'Content-Type': 'application/json'
        },
        params: params
      };
      
 return   axios.get(`https://api.ultramsg.com/${URLDETAILS.INSTANCE_ID}/instance/status`,config).then(response=>response.data)
}
export const getWaGroups = ()=>{
    var params= {
        "token": "4l6v9zt25x8obfjq"
    };
    var config = {
        headers: {  
          'Content-Type': 'application/json'
        },
        params: params
      };
      
 return   axios.get(`https://api.ultramsg.com/${URLDETAILS.INSTANCE_ID}/groups`,config).then(response=>response.data)

}
export const waLogOut = ()=>{
    var data = JSON.stringify({
        "token": "4l6v9zt25x8obfjq"
    });
    
    var config = {
      method: 'post',
      url: 'https://api.ultramsg.com/instance56690/instance/logout',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
      
 return   axios(config).then(res=>res.data)

}

export const waSendAudio =(base64file,grpId)=>{
  var data = JSON.stringify({
    "token": "4l6v9zt25x8obfjq",
    "to": grpId,
    "audio": base64file
});

var config = {
  method: 'post',
  url: 'https://api.ultramsg.com/instance56690/messages/voice',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

return axios(config).then(response =>response.data)

}