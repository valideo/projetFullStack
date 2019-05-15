// Imports
var jwt = require('jsonwebtoken');


// Exported functions
module.exports = {
  generateTokenForUser: function(userData) {
    return jwt.sign(
      {
        email: userData.email,
        userId: userData._id
      },
      "valideo",
      {
          expiresIn: "1h"
      }
    );
  },
  getUserId: function(authorization) {
    var userId = -1;
    var token =  authorization.split(" ")[1]
    if(token != null) {
      try {
        var jwtToken = jwt.verify(token, "valideo");
        if(jwtToken != null)
          userId = jwtToken.userId;
      } catch(err) { 
        console.log(err);
      }
    }
    else
      console.log("token null")
    return userId;
  },
}