import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';

import "./Timer.scss";

class Timer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: false,
            pomodoroLength: 25 * 60,
            current: 0,
            theme: createMuiTheme({
                palette: {
                  primary: green
                },
            }),
            id: null
        }

        this.toggleTimer = this.toggleTimer.bind(this);
        this.runMe = this.runMe.bind(this);
    }

    runMe() {
        console.log(this.state.current);
        this.setState(
            {
                current: this.state.current + 1
            }
        );
    }

    toggleTimer(event) {
        this.setState(
            {
                active: !this.state.active,
                theme: createMuiTheme({
                    palette: {
                        primary: this.state.active ? green : red
                    },
                })
            }
        );

        if (this.state.active) {
            clearInterval(this.state.id);
        } else {
            var refreshIntervalId = setInterval(this.runMe, 1000);
            this.setState({id: refreshIntervalId})
        }
    }

    render() {

        return (
            <Grid container 
                alignItems="center"
                justify="center"
                className="timer">
                <Grid item xs={12} className="timer-holder">
                    <span>{(this.state.pomodoroLength - this.state.current) / 60 | 0}</span>
                    <span> : </span> 
                    <span>{String((this.state.pomodoroLength - this.state.current) % 60).length === 1 ? 
                        "0" + ((this.state.pomodoroLength - this.state.current) % 60) : 
                        (this.state.pomodoroLength - this.state.current) % 60}</span>
                </Grid>

                <Grid item xs={10}>
                    <ThemeProvider theme={this.state.theme}>
                        <Button className="timer-action-button" variant="contained" color="primary" onClick={this.toggleTimer}>
                            { this.state.active ? "Pause" : "Start" }
                        </Button>
                    </ThemeProvider>
                </Grid>
            </Grid>
        )
    }
}

export default Timer;