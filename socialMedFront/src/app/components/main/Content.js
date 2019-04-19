import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Cards from './Home/Posts/Cards'

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

function Content(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
          <Cards/>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
          <Cards/>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
          <Cards/>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
          <Cards/>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
          <Cards/>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
          <Cards/>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
          <Cards/>
        </Grid>
      </Grid>
    </div>
  );
}

Content.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content);