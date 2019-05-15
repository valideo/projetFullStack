import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import openSocket from 'socket.io-client';
import { getRequest } from '../../../providers/apiProvider';
const  socket = openSocket('localhost:3100');

const styles = {

    convContainer: {
        height : "22%"
        },
    msgContainer: {
        "overflow-y" : "scroll",
        height : "100%"
    }
};


class MessengerContainer extends React.Component{

constructor(props){
  super(props);
  this.state = {
    postsData : [],
    inputChat : "",
    meData : []
  }
}

appendMsgMe(){
    var msgContainer = document.getElementById("convContainer"); 
    msgContainer.innerHTML += '<p style="width : 80%; margin-left : 20%; text-align : right; background-color : #754220; color : white; padding : 5px 10px; border-radius : 10px">'+this.state.inputChat+'</p>';
 }

componentWillMount(){
  var userMe;
  getRequest("/user/me").then(data =>{
    if(data[0]["profilePic"] == undefined)
      data[0]["profilePic"] = data[0]["fName"].substring(0,1) + data[0]["lName"].substring(0,1);
    else
      data[0]["profilePic"] = "http://localhost:3000/uploads/profiles/" + data[0]["profilePic"];
    this.setState({'meData' : data});
    userMe = data
  }, err =>{
    console.log(err);
  });

  socket.on('newmsg', function appendNewMsg(message){
    if(message.user[0]._id != userMe[0]._id)
      document.getElementById("convContainer").innerHTML += '<span style="text-transform: lowercase;font-size: 12px;color: #888;padding-left: 10px;">'+message.user[0].pseudo+'</span><p style="width : 80%; background-color : #35bac1; color : white; padding : 5px 10px; border-radius : 10px; margin-top : 0px">'+message.text+'</p>';
    else
      document.getElementById("convContainer").innerHTML += '<p style="width : 80%; margin-left : 20%; text-align : right; background-color : #754220; color : white; padding : 5px 10px; border-radius : 10px">'+message.text+'</p>';

      console.log(message);
  });
}

handleKeyPress = (event) => {
    if(event.key == 'Enter'){
      socket.emit('newmsg', {text : this.state.inputChat, user : this.state.meData });
      this.appendMsgMe();
      this.setState({inputChat: ""});
      var messageBody = document.querySelector('#convContainer');
      messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
    }
}

handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };



render() {
    const { classes } = this.props;
        
    return (
    <div className={classes.convContainer}>
        <div id="convContainer" className={classes.msgContainer}></div>
        <TextField
        id="outlined-flexible"
        onKeyPress={this.handleKeyPress}
        label="Votre message"
        rowsMax="1"
        value={this.state.inputChat}
        onChange={this.handleChange('inputChat')}
        className={classes.textField}
        margin="normal"
        fullWidth
        placeholder="Message"
        variant="outlined"
        />
     </div>
    );
  }
}

MessengerContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MessengerContainer);