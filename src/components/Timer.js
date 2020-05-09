import React, { Component } from "react";
import Button from '@material-ui/core/Button';
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
            })
        }

        this.toggleTimer = this.toggleTimer.bind(this);
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
    }

    render() {

        return (
            <div className="timer">
                <ThemeProvider theme={this.state.theme}>
                    <Button variant="contained" color="primary" onClick={this.toggleTimer}>
                        { this.state.active ? "Stop" : "Start" }
                    </Button>
                </ThemeProvider>
            </div>
        )
    }
}

export default Timer;