import React from 'react';
import {render} from 'react-dom';
import Grid from '@material-ui/core/Grid';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

//Components
import Login from "./components/userAuth/login";
import Register from "./components/userAuth/register";
import pwForgot from "./components/userAuth/pwForgot";
import Structure from "./components/main/Structure";


class App extends React.Component{
    render(){
        const theme = createMuiTheme({
            palette: {
              primary: { main: '#754220' }, // Purple and green play nicely together.
              secondary: { main: '#35bac1' }, // This is just green.A700 as hex.
            },
            typography: { useNextVariants: true },
          });
        return (
            
            <Router>
                <MuiThemeProvider theme={theme}>
                <Route exact path="/" component={Structure}/>
                <Grid container wrap="nowrap" spacing={24}>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4} zeroMinWidth>
                        <Route exact path="/register" component={Register}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/forgot_password" component={pwForgot}/>
                    </Grid>
                    <Grid item xs={4}></Grid>
                </Grid>
                </MuiThemeProvider>
            </Router>
        );
    }
}

render(<App/>, window.document.getElementById("app"));