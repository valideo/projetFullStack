import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { Link } from 'react-router-dom';
import  MessengerContainer  from './Messenger/Container'
import { getRequest, putRequest } from './../../providers/apiProvider'
import Avatar from '@material-ui/core/Avatar';
import AddCircle from '@material-ui/icons/AddCircle';
import CheckCircle from '@material-ui/icons/CheckCircle';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  grow: {
    flexGrow: 1,
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  notifButton: {
    marginRight: 50,
  },
  siteTitle: {
    marginRight: 50,
    marginLeft : 50,
    color : 'white'
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: '20%',
    flexShrink: 0,
  },
  drawerPaper: {
    width: '20%',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  listSideBar: {
    height: '25%',
    "overflow-y": 'scroll'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
  listSearch: {
    position: "absolute",
    width: "100%",
    border: "solid 1px #754220"
  },icon: {
    margin: theme.spacing.unit * 2,
    color : theme.palette.secondary
  },listRequests: {
    position: "absolute",
    width: "300px",
    border: "solid 1px #754220",
    top: "55px",
    right : "-40px",
    display : "none"
  }
});

class Header extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      open: false,
      anchorEl: null,
      usersSearch : [],
      requestsOpen : "none",
      requests : [],
      nbrequests : 0,
      friends : []
    };

    this.onQueryChanged = this.onQueryChanged.bind(this);
    this.openRequests = this.openRequests.bind(this);
  }

  componentDidMount(){
    getRequest("/user/me").then(data =>{
      var dataRequests = data[0]["friendsRequestsReceived"];
      var dataFriends = data[0]["friendsList"];
      var friendsRequestsArray = [];
      if(dataRequests != undefined)
        friendsRequestsArray = dataRequests.split(',');
      var dataFriendsArray = [];
      if(dataFriends != undefined)
        dataFriendsArray = dataFriends.split(',');
      var arrayDetail = [];
      var arrayDetailFriends = [];
      var index = 0;
      this.setState({nbrequests : 0})
      friendsRequestsArray.forEach(idUser => {
        index += 1;
        getRequest("/user/find/" + idUser).then(data =>{
          if(data.length  != 0){
            arrayDetail.push(data);
          }
        }, err =>{
          console.log(err);
        });
      });
      dataFriendsArray.forEach(idFriend => {

        getRequest("/user/find/" + idFriend).then(data =>{
          if(data.length  != 0){
            arrayDetailFriends.push(data);
          }
        }, err =>{
          console.log(err);
        });
      });
      this.setState({nbrequests : index})
      this.setState({requests : arrayDetail})
      this.setState({friends : arrayDetailFriends})
    }, err =>{
      console.log(err);
    });
  }

  onQueryChanged = name => event => {
    var queryString = event.target.value;

    if(queryString != ""){
      getRequest("/user/" + queryString).then(data =>{
        this.setState({usersSearch : data})
      }, err =>{
        console.log(err);
      });
    }else{
      this.setState({usersSearch : []})
    }
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  addToFriend(userId){
    var dataFriend = {friends : userId}
    putRequest(dataFriend, "/user/requestFriend").then(data =>{

    }, err =>{
      console.log(err);
    });
  }

  validFriend(userId){
    var dataFriend = {friends : userId}
    putRequest(dataFriend, "/user/addFriend").then(data =>{
      console.log(data);
    }, err =>{
      console.log(err);
    });
  }

  openRequests(){
    console.log("clicked");
    if(this.state.requestsOpen == "none")
      this.setState({requestsOpen : "block"})
    else
      this.setState({requestsOpen : "none"})
  }

  render() {
    const { classes, theme } = this.props;
    const { open, anchorEl } = this.state;
    const isMenuOpen = Boolean(anchorEl);

    let searchedUsers = this.state.usersSearch.map(user =>{
      if(user.profilePic == undefined || user.profilePic.length < 7){
        return(
          <div>
            <ListItem>
              <Avatar className={classes.avatar}>{user.fName.charAt(0) + user.lName.charAt(0)}</Avatar>
              <ListItemText primary={user.pseudo} secondary={user.fName +" "+ user.lName} />
              <AddCircle style={{ fill: '#35bac1' }} onClick={() => this.addToFriend(user._id)}>{user._id} className={classes.icon}></AddCircle>
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        )
      }else{
        return(
          <div>
            <ListItem>
             <Avatar  src={"http://localhost:3000/uploads/profiles/"+user.profilePic} className={classes.avatar}/>
              <ListItemText primary={user.pseudo} secondary={user.fName +" "+ user.lName} />
              <AddCircle style={{ fill: '#35bac1' }} onClick={() => this.addToFriend(user._id)}>{user._id} className={classes.icon}></AddCircle>
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        )
      }
    });

    let friendRequests = this.state.requests.map(user =>{
      if(user.profilePic == undefined || user.profilePic.length < 7){
        return(
          <div>
            <ListItem>
              <Avatar className={classes.avatar}>{user.fName.charAt(0) + user.lName.charAt(0)}</Avatar>
              <ListItemText primary={user.pseudo} secondary={user.fName +" "+ user.lName} />
              <CheckCircle style={{ fill: '#35bac1' }} onClick={() => this.validFriend(user._id)}>{user._id} className={classes.icon}></CheckCircle>            
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        )
      }else{
        return(
          <div>
            <ListItem>
             <Avatar  src={"http://localhost:3000/uploads/profiles/"+user.profilePic} className={classes.avatar}/>
              <ListItemText primary={user.pseudo} secondary={user.fName +" "+ user.lName} />
              <CheckCircle style={{ fill: '#35bac1' }} onClick={() => this.validFriend(user._id)}>{user._id} className={classes.icon}></CheckCircle>            
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        )
      }
    });

    let friends = this.state.friends.map(user =>{
      if(user.profilePic == undefined || user.profilePic.length < 7){
        return(
          <div>
            <ListItem>
              <Avatar className={classes.avatar}>{user.fName.charAt(0) + user.lName.charAt(0)}</Avatar>  
              <ListItemText primary={user.pseudo} secondary={user.fName +" "+ user.lName} />         
            </ListItem>
          </div>
        )
      }else{
        return(
          <div>
            <ListItem>
             <Avatar  src={"http://localhost:3000/uploads/profiles/"+user.profilePic} className={classes.avatar}/>
              <ListItemText primary={user.pseudo} secondary={user.fName +" "+ user.lName} />           
            </ListItem>
          </div>
        )
      }
    });

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar disableGutters={!open}>
            <Link to="/home">
              <Typography className={classes.siteTitle} variant="h6" color="inherit" noWrap>
                InstaBook
              </Typography>
            </Link>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                onChange={this.onQueryChanged('querySearch')}
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
              <List className={classes.listSearch}>
                {searchedUsers}
              </List>
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <Link to="/profile" style={{color : 'white'}}>
                <IconButton
                  aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                  aria-haspopup="true"
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </Link>
              <IconButton 
              color="inherit"
              aria-label="Open messages"
              onClick={this.handleDrawerOpen}
              className={classNames(open)}>
                <Badge badgeContent={4} color="secondary">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton 
              color="inherit"
              className={classes.notifButton}
              >
                <Badge badgeContent={this.state.nbrequests} color="secondary" onClick={this.openRequests}>
                  <NotificationsIcon  />
                </Badge>
                <List className={classes.listRequests} style={{'display' : this.state.requestsOpen }}>
                {friendRequests}
              </List>
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />     
          </main>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="right"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <Typography variant="h6">
              Amis
            </Typography>
          <List className={classes.listSideBar}>
            {friends}
          </List>
          <Divider />
          <Typography variant="h6">
              Discussions de groupe
            </Typography>
          <List className={classes.listSideBar}>
            
          </List>
          <Divider />
          <Typography variant="h6">
              Discussion générale
            </Typography>
          <MessengerContainer/>
        </Drawer>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Header);