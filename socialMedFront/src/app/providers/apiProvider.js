import axios from 'axios';

  
  let baseUrl = "http://localhost:3000";
  var token = "";
  let headers = {
    'Content-Type': 'application/json',
    'Authorization' : 'Baerer ' + token
  };

  function AostRequest(body, route){
    
    let options = {headers: headers};
    let postData = body;
    return new Promise((resolve) => {
      axios.post(baseUrl + route, postData, options).subscribe(data => {
        token = data['token'];
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  export default AostRequest;
