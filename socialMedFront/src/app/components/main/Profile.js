import React from 'react';
import FormPost from './Profile/FormPost'
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { getRequest, AostUploadImg, putRequest } from '../../providers/apiProvider';
import Cards from './Posts/Cards';
import Grid from '@material-ui/core/Grid';

const styles = {
  avatar: {
    margin: 10,
    width: 150,
    height: 150,
    alignItems : 'center'
  },
  input: {
    display: 'none',
  }
};


class Profile extends React.Component{

constructor(props){
  super(props);
  this.state = {
    postsData : [],
    userData : [],
    filePicProfile: null,
  }
  this.onChange = this.onChange.bind(this);
  this.updatePic = this.updatePic.bind(this);
  this.loadData = this.loadData.bind(this);
}

componentDidMount(){
 this.loadData();
}

loadData(e){
    getRequest("/user/me").then(data =>{
    if(data[0]["profilePic"] == undefined)
      data[0]["profilePic"] = data[0]["fName"].substring(0,1) + data[0]["lName"].substring(0,1);
    else
      data[0]["profilePic"] = "http://localhost:3000/uploads/profiles/" + data[0]["profilePic"];
    this.setState({'userData' : data});

    var dataArray = [];
    var posts = [];
    getRequest("/posts/me").then(data =>{
      dataArray = data;
      dataArray.forEach(element => {
        var date = new Date(element["date"]).toLocaleString();
        var description = element["msg"];
        var picUrl = "http://localhost:3000/uploads/posts/"+element["picUrl"];
        var userInfos = this.state.userData[0];

        posts.push({date : date, msg : description, picUrl : picUrl, userInfos : userInfos, id: element["_id"]});
      });
      console.log(posts.length);
      this.setState({'postsData' : posts});
    }, err =>{
      console.log(err);
    });
  }, err =>{
    console.log(err);
  });

}

onChange(e) {
  this.setState({filePicProfile:e.target.files[0]});
}

updatePic(e){
  const formData = new FormData();
  formData.append('file',this.state.filePicProfile);
  console.log(formData);
  console.log(this.state.filePicProfile);
  AostUploadImg(formData,"/uploads/profiles/").then(data =>{
      console.log(data);
      const updateData = {'profilePic' : data}
      putRequest(updateData,"/user/me/").then(dataUpdated =>{
        console.log(dataUpdated);
      }, err =>{
        console.log(err);
    });
    }, err =>{
      console.log(err);
  });
}


render() {
    const { classes } = this.props;
    let postsCards = this.state.postsData.map(post =>{
      return(
        <Cards post={post}/>
      )
    });
    let avatarProfile = this.state.userData.map(user =>{
      if(user.profilePic.length < 7){
        return(
          <Avatar htmlFor="profilePicFile" className={classes.avatar}>{user.profilePic}</Avatar>
        )
      }else{
        return(
          <Avatar htmlFor="profilePicFile" src={user.profilePic} className={classes.avatar}/>
        )
      }
    });
    return (
      <div>
        <input accept="image/*" name="imgUpload" onChange={this.onChange} className={classes.input} id="profilePicFile" type="file" />
        <label htmlFor="profilePicFile">
          {avatarProfile}
        </label>
        <button color="primary" onClick={this.updatePic}>Mettre à jour</button>
        <FormPost />
        <div>
        <Grid container spacing={24}>
        {postsCards}
        </Grid>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);