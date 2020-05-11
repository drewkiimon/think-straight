import React, { Component } from "react";
import * as Constants from "../constants/constants";
import Button from "@material-ui/core/Button";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { green, red } from "@material-ui/core/colors";

import "./Timer.scss";

class Timer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			pomodoroLength: 25 * 60,
			shortBreakLength: 5 * 60,
			longBreakLength: 15 * 60,
			current: 0,
			completedPomodoros: 0,
			active: false,
			readyForBreak: false,
			onShortBreak: false,
			onLongBreak: false,
			theme: createMuiTheme({
				palette: {
					primary: green,
				},
			}),
			id: null,
		};

		this.toggleTimer = this.toggleTimer.bind(this);
		this.runMe = this.runMe.bind(this);
		this.getTime = this.getTime.bind(this);
		this.playAlarm = this.playAlarm.bind(this);
		this.toggleBreak = this.toggleBreak.bind(this);
	}

	playAlarm() {
		var audio = document.getElementById("audio");

		audio
			.play()
			.then(function () {
				console.log("Playback success");
			})
			.catch(function (err) {
				console.log("Playback error:", err);
			});
	}

	runMe() {
		this.setState({
			current: this.state.current + 1,
		});

		if (
			this.state.onShortBreak &&
			this.state.current === this.state.shortBreakLength
		) {
			this.playAlarm();

			document.title = Constants.LETS_GO;

			clearInterval(this.state.id);

			this.setState({
				active: false,
				current: 0,
				theme: createMuiTheme({
					palette: {
						primary: this.state.active ? green : red,
					},
				}),
				readyForBreak: false,
			});
		} else if (
			this.state.onLongBreak &&
			this.state.current === this.state.longBreakLength
		) {
			this.playAlarm();

			document.title = Constants.LETS_GO;

			clearInterval(this.state.id);
		} else if (this.state.current === 3) {
			// if (this.state.current === this.state.pomodoroLength) {
			// test
			this.playAlarm();

			document.title = Constants.THINK_STRAIGHT;

			clearInterval(this.state.id);

			this.setState({
				active: false,
				current: 0,
				theme: createMuiTheme({
					palette: {
						primary: this.state.active ? green : red,
					},
				}),
				readyForBreak: true,
				completedPomodoros: this.state.completedPomodoros + 1,
			});
		}
	}

	toggleTimer() {
		this.setState({
			active: !this.state.active,
			theme: createMuiTheme({
				palette: {
					primary: this.state.active ? green : red,
				},
			}),
		});

		if (this.state.active) {
			document.title = Constants.PAUSED;
			clearInterval(this.state.id);
		} else {
			document.title = Constants.FOCUSING;
			var refreshIntervalId = setInterval(this.runMe, 1000);
			this.setState({ id: refreshIntervalId });
		}
	}

	toggleBreak() {
		let breakType =
			this.state.completedPomodoros % 4 === 0 ? "LONG" : "SHORT";

		document.title = Constants.TAKING_A_BREATHER;

		this.setState({
			id: refreshIntervalId,
			onLongBreak: breakType === "LONG",
			onShortBreak: breakType === "SHORT",
		});

		var refreshIntervalId = setInterval(this.runMe, 1000);
	}

	getTime(timerLength) {
		var minutes = ((timerLength - this.state.current) / 60) | 0,
			seconds =
				String((timerLength - this.state.current) % 60).length === 1
					? "0" + ((timerLength - this.state.current) % 60)
					: (timerLength - this.state.current) % 60;

		return minutes + ":" + seconds;
	}

	render() {
		return (
			<div className='timer'>
				<audio id='audio' src='./done.mp3' type='audio/mpeg'></audio>

				<div className='timer-holder'>
					{this.state.readyForBreak
						? Constants.BREAK
						: this.getTime(this.state.pomodoroLength)}
				</div>

				<div className='timer-button' lg={3} md={4} sm={7} xs={8}>
					<ThemeProvider theme={this.state.theme}>
						{this.state.readyForBreak ? (
							<Button
								className='timer-action-button'
								variant='contained'
								color='primary'
								onClick={this.toggleBreak}>
								{this.state.active ? "Pause" : "Start Break"}
							</Button>
						) : (
							<Button
								className='timer-action-button'
								variant='contained'
								color='primary'
								onClick={this.toggleTimer}>
								{this.state.active ? "Pause" : "Start"}
							</Button>
						)}
					</ThemeProvider>
				</div>
			</div>
		);
	}
}

export default Timer;
