import React, { Component } from "react";
import * as Constants from "../constants/constants";
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
        this.time = this.time.bind(this);
        this.playAlarm = this.playAlarm.bind(this);
    }

    playAlarm() {
        var audio = document.getElementById("audio");

        audio.play()
            .then(function() {
                console.log('Playback success');
            })
            .catch(function(err) {
                console.log('Playback error:', err);
            });
    }

    runMe() {
        this.setState(
            {
                current: this.state.current + 1
            }
        );

        if (this.state.current === this.state.pomodoroLength) {
            this.playAlarm(); 

            document.title = Constants.THINK_STRAIGHT;

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
            document.title = Constants.PAUSED;
            clearInterval(this.state.id);
        } else {
            document.title = Constants.FOCUSING;
            var refreshIntervalId = setInterval(this.runMe, 1000);
            this.setState({id: refreshIntervalId})
        }
    }

    time() {
        var minutes = (this.state.pomodoroLength - this.state.current) / 60 | 0,
            seconds = String((this.state.pomodoroLength - this.state.current) % 60).length === 1 ? 
                        "0" + ((this.state.pomodoroLength - this.state.current) % 60) : 
                        (this.state.pomodoroLength - this.state.current) % 60;

        return minutes + ":" + seconds;
    }

    render() {

        return (
            <div className="timer">
                <audio id="audio" src="./done.mp3" type="audio/mpeg"></audio>
                <div className="timer-holder">{this.time()}</div>

                <div className="timer-button" lg={3} md={4} sm={7} xs={8}>
                    <ThemeProvider theme={this.state.theme}>
                        <Button className="timer-action-button" variant="contained" color="primary" onClick={this.toggleTimer}>
                            { this.state.active ? "Pause" : "Start" }
                        </Button>
                    </ThemeProvider>
                </div>
            </div>
        )
    }
}

export default Timer;