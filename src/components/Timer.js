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
            }),
            id: null
        }

        this.toggleTimer = this.toggleTimer.bind(this);
        this.runMe = this.runMe.bind(this);
    }

    runMe() {
        // had to bind so I  could use 'this'
        this.setState({current: this.state.current + 1})
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
            // clear
            clearInterval(this.state.id);
        } else {
            var refreshIntervalId = setInterval(this.runMe, 1000);
            this.setState({id: refreshIntervalId})
        }
    }

    render() {

        return (
            <div className="timer">
                <div>
                    {Math.floor((this.state.pomodoroLength - this.state.current) / 60)} {(this.state.pomodoroLength - this.state.current) % 60}
                </div>

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