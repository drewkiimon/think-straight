import React, { Component } from "react";
import Button from '@material-ui/core/Button';

import "./Timer.scss";


class Timer extends Component {
    constructor(props) {
        super(props);

        this.toggleTimer = this.toggleTimer.bind(this);

        this.state = {
            active: false,
            pomodoroLength: 25 * 60,
            current: 0
        }
    }

    toggleTimer(event) {
        this.setState({active: !this.state.active});
        console.log(this.state.active)
    }

    render() {

        return (
        <div className="timer">
            <Button variant="contained" color="primary" onClick={this.toggleTimer}>
                {this.state.active
                    ? "Stop" 
                    : "Start"
                }
            </Button>
        </div>
        )
    }
}

export default Timer;