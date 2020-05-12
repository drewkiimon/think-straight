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
			timerLength: Constants.POMODORO_LENGTH,
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
		this.incrementTimer = this.incrementTimer.bind(this);
		this.getTime = this.getTime.bind(this);
		this.playAlarm = this.playAlarm.bind(this);
		this.startBreak = this.startBreak.bind(this);
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

	incrementTimer() {
		this.setState({
			current: this.state.current + 1,
		});

		if (
			this.state.onShortBreak &&
			this.state.current === 2
			// this.state.current === Constants.SHORT_BREAK_LENGTH
		) {
			this.playAlarm();

			document.title = Constants.LETS_GO;

			clearInterval(this.state.id);

			this.setState({
				timerLength: Constants.POMODORO_LENGTH,
				current: 0,
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
			});
		} else if (
			this.state.onLongBreak &&
			this.state.current === Constants.LONG_BREAK_LENGTH
		) {
			this.playAlarm();

			document.title = Constants.LETS_GO;

			clearInterval(this.state.id);

			this.setState({
				timerLength: Constants.POMODORO_LENGTH,
				current: 0,
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
			});
		} else if (
			!this.state.onShortBreak &&
			!this.state.onLongBreak &&
			this.state.current === 2
			// this.state.current === this.state.pomodoroLength
		) {
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
			var refreshIntervalId = setInterval(this.incrementTimer, 1000);
			this.setState({ id: refreshIntervalId });
		}
	}

	startBreak() {
		let breakType =
			this.state.completedPomodoros % 4 === 0 ? "LONG" : "SHORT";

		document.title = Constants.TAKING_A_BREATHER;

		var refreshIntervalId = setInterval(this.incrementTimer, 1000);

		this.setState({
			active: true,
			id: refreshIntervalId,
			onLongBreak: breakType === "LONG",
			onShortBreak: breakType === "SHORT",
			readyForBreak: false,
			timerLength:
				breakType === "SHORT"
					? Constants.SHORT_BREAK_LENGTH
					: Constants.LONG_BREAK_LENGTH,
			theme: createMuiTheme({
				palette: {
					primary: red,
				},
			}),
		});
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
		var streaks = [];

		// this keeps happening with each timer tick
		for (var streak = 0; streak < this.state.completedPomodoros; streak ++) {
			streaks.push(<i key={streak} className="fas fa-fire-alt"></i>);
		}

		return (
			<div className='timer'>
				<audio id='audio' src='./done.mp3' type='audio/mpeg'></audio>

				{streaks}

				<div className='timer-holder'>
					{this.state.readyForBreak
						? Constants.BREAK
						: this.getTime(this.state.timerLength)}
				</div>

				<div className='timer-button' lg={3} md={4} sm={7} xs={8}>
					<ThemeProvider theme={this.state.theme}>
						{this.state.readyForBreak ? (
							<Button
								className='timer-action-button'
								variant='contained'
								color='primary'
								onClick={this.startBreak}>
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
