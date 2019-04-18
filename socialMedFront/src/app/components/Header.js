import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

  

export class Header extends React.Component {
    render(){
        const styles = {
            root: {
              flexGrow: 1,
            },
            grow: {
              flexGrow: 1,
            },
            menuButton: {
              marginLeft: -12,
              marginRight: 20,
            },
          };
        return(
            <div style={styles.root}>
                <AppBar position="static">
                    <Toolbar>
                    <IconButton style={styles.menuButton} color="inherit" aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" style={styles.grow}>
                        News
                    </Typography>
                    <Button color="inherit">Logout</Button>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
    
}

