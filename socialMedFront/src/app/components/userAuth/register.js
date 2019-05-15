import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom'
import { postRequest } from '../../providers/apiProvider';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class registerForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      email : "",
      password : "",
      fName : "",
      lName : "",
      pseudo : "",
      confPwd : ""
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e){
    e.preventDefault();
    if(this.state.password == this.state.confPwd){
    registerRequest({password : this.state.password, email : this.state.email, fName : this.state.fName, lName : this.state.lName, pseudo : this.state.pseudo},"/user/signup/").then(data =>{
      console.log(data);
      this.props.history.push('/login')
    }, err =>{
      console.log(err);
    });
    }
  }

  onChange(e){
    this.setState({[e.target.name] : e.target.value});
  }

  render(){
    const { classes } = this.props;
    const {email, password, fName, lName, pseudo, confPwd}  = this.state;

  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input id="email" name="email" autoComplete="email" value={email} onChange={this.onChange} autoFocus />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password" type="password" id="password" value={password} onChange={this.onChange} autoComplete="current-password" />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Confirm password</InputLabel>
            <Input name="confPwd" type="password" id="confPwd" value={confPwd} onChange={this.onChange}  />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Prenom</InputLabel>
            <Input name="fName" type="text" id="fName" value={fName} onChange={this.onChange}/>
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Nom</InputLabel>
            <Input name="lName" type="text" id="lName" value={lName} onChange={this.onChange} />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Pseudo</InputLabel>
            <Input name="pseudo" type="text" id="pseudo" value={pseudo} onChange={this.onChange}/>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={this.onSubmit}
          >
            Sign up
          </Button>
        </form>
        <Typography component="h6" variant="h6">
          Déjà inscrit ?  <Link to="/login" >Se connecter.</Link>
        </Typography>
      </Paper>
    </main>
  );
}
}

registerForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(registerForm);
