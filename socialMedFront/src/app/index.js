import React from 'react';
import {render} from 'react-dom';
import Grid from '@material-ui/core/Grid';

//Components
import Login from "./components/userAuth/login";
import Register from "./components/userAuth/register";


class App extends React.Component{
    render(){
        return (
            <Grid container wrap="nowrap" spacing={24}>
                <Grid item xs={4}></Grid>
                <Grid item xs={4} zeroMinWidth>
                    <Login/>
                    <Register/>
                </Grid>
                <Grid item xs={4}>
                </Grid>
            </Grid>
        );
    }
}

render(<App/>, window.document.getElementById("app"));