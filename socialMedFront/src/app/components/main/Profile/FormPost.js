import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Grid from '@material-ui/core/Grid';
import { AostUploadImg, postRequest } from '../../../providers/apiProvider';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  }
});

class FormPost extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            file: null,
            multiline: '',
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  onChange(e) {
    this.setState({file:e.target.files[0]});
}
onFormSubmit(e){
    e.preventDefault();
    const formData = new FormData();
    formData.append('file',this.state.file);
    AostUploadImg(formData,"/uploads/posts/").then(data =>{
        console.log(data);
        const todayDate = new Date();
        const bodyData = {'picUrl': data, 'msg' : this.state.multiline, 'date' : todayDate};
        console.log(bodyData);
        postRequest(bodyData,"/posts").then(data =>{
            this.props.updateView;
            console.log(data);
          }, err =>{
            console.log(err);
          });
      }, err =>{
        console.log(err);
    });
}

  render() {
    const { classes } = this.props;

    return (
        <Grid container spacing={24}>
            <Grid item xs={11} sm={11} md={11} lg={11} xl={11}>
                <form className={classes.container} noValidate autoComplete="off" onSubmit={this.onFormSubmit}>
                    <TextField
                    id="outlined-multiline-flexible"
                    label="Nouvelle publication"
                    multiline
                    rowsMax="4"
                    value={this.state.multiline}
                    onChange={this.handleChange('multiline')}
                    className={classes.textField}
                    margin="normal"
                    fullWidth
                    placeholder="Description"
                    variant="outlined"
                    />
                    <input accept="image/*" name="imgUpload" onChange={this.onChange} className={classes.input} id="icon-button-file" type="file" />
                    <label htmlFor="icon-button-file">
                        <IconButton color="primary" className={classes.button} component="span">
                        <PhotoCamera />
                        </IconButton>
                    </label>
                    <button variant="contained" color="primary" type="submit">Publier</button>
                </form>
            </Grid>
            <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
            
            </Grid>
        </Grid>
    );
  }
}

FormPost.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FormPost);