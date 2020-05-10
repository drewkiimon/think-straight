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

        this.setState(
            {
                current: this.state.current + 1
            }
        );

        // We are done
        if (this.state.current === this.state.pomodoroLength) {
            // change title back
            document.title = "think straight.";
            // clear the current time
            clearInterval(this.state.id);
            this.setState(
                {
                    active: false,
                    current : 0,
                    theme: createMuiTheme({
                        palette: {
                            primary: this.state.active ? green : red
                        }
                    })
                }
            );
        }
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
            document.title = "paused.";
            clearInterval(this.state.id);
        } else {
            document.title = "focusing...";
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
                <Grid fontFamily="Monospace" item xs={12} className="timer-holder">
                    <span fontFamily="Monospace">{(this.state.pomodoroLength - this.state.current) / 60 | 0}</span>
                    <span>:</span> 
                    <span>{String((this.state.pomodoroLength - this.state.current) % 60).length === 1 ? 
                        "0" + ((this.state.pomodoroLength - this.state.current) % 60) : 
                        (this.state.pomodoroLength - this.state.current) % 60}</span>
                </Grid>

                <Grid item lg={3} md={4} sm={7} xs={8}>
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