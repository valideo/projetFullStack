import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class Cards extends React.Component {
  constructor(props){
    super(props);
  }
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;
    
      if(this.props.post.userInfos.profilePic == undefined || this.props.post.userInfos.profilePic.length < 7){
        return(
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Card className={classes.card}>
                <CardHeader
                  avatar={
                 <Avatar className={classes.avatar}>{this.props.post.userInfos.profilePic}</Avatar>
                  }
                  action={
                    <IconButton>
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={this.props.post.userInfos.pseudo}
                  subheader={this.props.post.date}
                />
                <CardMedia
                  className={classes.media}
                  image={this.props.post.picUrl}
                />
                <CardContent>
                  <Typography component="p">
                    {this.props.post.msg}
                  </Typography>
                </CardContent>
                <CardActions className={classes.actions} disableActionSpacing>
                  <IconButton aria-label="Add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="Share">
                    <ShareIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          );        
      }else{
        return(
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Card className={classes.card}>
                <CardHeader
                  avatar={
                <Avatar src={this.props.post.userInfos.profilePic} className={classes.avatar}/>
                  }
                  action={
                    <IconButton>
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={this.props.post.userInfos.pseudo}
                  subheader={this.props.post.date}
                />
                <CardMedia
                  className={classes.media}
                  image={this.props.post.picUrl}
                />
                <CardContent>
                  <Typography component="p">
                    {this.props.post.msg}
                  </Typography>
                </CardContent>
                <CardActions className={classes.actions} disableActionSpacing>
                  <IconButton aria-label="Add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="Share">
                    <ShareIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
        )
      }
    }
  }

Cards.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Cards);