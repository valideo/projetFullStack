import axios from 'axios';

  
  let baseUrl = "http://localhost:3000";
  var token = localStorage.getItem('access_token');
  var headers = {
    'Content-Type': 'application/json',
    'Authorization' : 'Baerer ' + token
  };

  function loginRequest(body){
    
    let options = {headers: headers};
    let postData = body;
    return axios.post(baseUrl + "/user/login/", postData, options).then(response => {
        localStorage.setItem('access_token',response.data['token']);
        console.log(response.data['token']);
        return response.data;
      });
  }

  function postRequest(body, route){
    
    let options = {headers: headers};
    let postData = body;
    return axios.post(baseUrl + route, postData, options).then(response => {
        return response.data;
      });
  }

  function getRequest(route){
    
    let options = {headers: headers};
    return axios.get(baseUrl + route, options).then(response => {
        return response.data;
      });
  }

  function putRequest(body, route){
    
    let options = {headers: headers};
    let postData = body;
    return axios.put(baseUrl + route, postData, options).then(response => {
        return response.data;
      });
  }

  let headersUpload = {
    'Content-Type': 'multipart/form-data',
    'Authorization' : 'Baerer ' + token,
  };

  function AostUploadImg(body, route){
    
    let options = {headers: headersUpload};
    let postData = body;
    return axios.post(baseUrl + route, postData, options).then(response => {
        return response.data;
      });
  }

  export {loginRequest, postRequest, AostUploadImg, getRequest, putRequest};
