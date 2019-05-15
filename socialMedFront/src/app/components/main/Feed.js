import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { getRequest } from '../../providers/apiProvider';
import Cards from './Posts/Cards';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});



class Feed extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      postsData : [],
    }
    this.loadData = this.loadData.bind(this);
  }

  componentDidMount(){
  this.loadData();
  }

  loadData(e){
    var dataArray = [];
    getRequest("/posts/all").then(dataPost =>{
      dataArray = dataPost;
      dataArray.forEach(element => {
        var date = new Date(element["date"]).toLocaleString();
        var description = element["msg"];
        var picUrl = "http://localhost:3000/uploads/posts/"+element["picUrl"];
        getRequest("/user/find/"+element["authorId"]).then(dataUser =>{
          if(dataUser["profilePic"] == undefined)
            dataUser["profilePic"] = dataUser["fName"].substring(0,1) + dataUser["lName"].substring(0,1);
          else
            dataUser["profilePic"] = "http://localhost:3000/uploads/profiles/" + dataUser["profilePic"];
          var userInfos = dataUser;
          let postsData = this.state.postsData;
          postsData.push({date : date, msg : description, picUrl : picUrl, userInfos : userInfos, id: element["_id"]});
          this.setState({'postsData' : postsData});
        }, err =>{
          console.log(err);
        });
      });
    }, err =>{
      console.log(err);
    });
}

  render(){

    const { classes } = this.props;
    let postsCards = this.state.postsData.map(post =>{
      return(
        <Cards post={post}/>
      )
    });

      return (
        <div>
        <Grid container spacing={24}>
        {postsCards}
        </Grid>
        </div>
    );
  }
  
}

Feed.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Feed);