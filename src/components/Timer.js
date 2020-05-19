import React, { useState, useEffect } from "react";
import * as Constants from "../constants/constants";
import moment from "moment";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { green, red } from "@material-ui/core/colors";

import TimerView from "./TimerView/TimerView";
import Streaks from "./Streaks/Streaks";
import TimerActions from "./TimerActions/TimerActions";

import "./Timer.scss";

const Timer = () => {
	// this.state = {
	// 	timerLength: Constants.POMODORO_LENGTH,
	// 	current: 0,
	// 	completedPomodoros: 0,
	// 	active: false,
	// 	readyForBreak: false,
	// 	onShortBreak: false,
	// 	onLongBreak: false,
	// 	theme: createMuiTheme({
	// 		palette: {
	// 			primary: green,
	// 		},
	// 	}),
	// 	id: null,
	// };
	console.log('AAA yeetus')
	const [timerLength, setTimerLength] = useState(Constants.POMODORO_LENGTH);
	const [timeElapsed, setTimeElapsed] = useState(0);
	const [completedPomodoros, setCompletedPomodoros] = useState(0);
	const [isTimerActive, setIsTimerActive] = useState(false);
	const [isReadyForBreak, setIsReadyForBreak] = useState(false);
	const [isOnShortBreak, setIsOnShortBreak] = useState(false);
	const [isOnLongBreak, setIsOnLongBreak] = useState(false);
	const [buttonTheme, setButtonTheme] = useState(createMuiTheme({
		palette: {
			primary: green,
		},
	}));
	const [intervalId, setIntervalId] = useState(null);

	// componentDidMount
	useEffect(() => {
		let today = moment().format("l"),
			dailyCheckKey =
				Constants.THINK_STRAIGHT_KEY + Constants.DATE + today,
			pomodorosDoneToday =
				Constants.THINK_STRAIGHT_KEY +
				Constants.COMPLETED +
				Constants.DATE +
				today;

		if (!localStorage.getItem(dailyCheckKey)) {
			localStorage.setItem(dailyCheckKey, today);
			// Add a "Snackbar" from material UI to say if they're on a streak or not
		}

		if (localStorage.getItem(pomodorosDoneToday)) {
			setCompletedPomodoros(parseInt(localStorage.getItem(pomodorosDoneToday)));
		}
	}, []) 

	const playAlarm = () => {
		var audio = document.getElementById("audio");

		audio.play()
			.then(function () {
				console.log("Playback successful");
			})
			.catch(function (err) {
				console.log("Playback error:", err);
			});
	};

	const resetTimer = () => {
		setTimeElapsed(0);
		setTimerLength(Constants.POMODORO_LENGTH);
		setIsTimerActive(false);
		setIsReadyForBreak(false);
		setIsOnShortBreak(false);
		setIsOnLongBreak(false);
		setButtonTheme(createMuiTheme({
			palette: {
				primary: green,
			},
		}));
		setIntervalId(null);
	};

	const stopPomodoroCycle = () => {
		document.title = Constants.THINK_STRAIGHT;

		clearInterval(intervalId);

		// this.setState({
			// current: 0,
			// timerLength: Constants.POMODORO_LENGTH,
			// active: false,
		// 	readyForBreak: false,
		// 	onShortBreak: false,
		// 	onLongBreak: false,
		// 	theme: createMuiTheme({
		// 		palette: {
		// 			primary: green,
		// 		},
		// 	}),
		// 	id: null,
		// });

		resetTimer();
	};

	const incrementTimer = () => {
		console.log('AAA look at me', timeElapsed);
		setTimeElapsed(timeElapsed + 1);
		// this.setState({
		// 	current: this.state.current + 1,
		// });

		if (
			(isOnShortBreak &&
				timeElapsed === Constants.SHORT_BREAK_LENGTH) ||
			(isOnLongBreak &&
				timeElapsed === Constants.LONG_BREAK_LENGTH)
		) {
			playAlarm();

			document.title = Constants.LETS_GO;

			clearInterval(intervalId);

			// this.setState({
			// 	timerLength: Constants.POMODORO_LENGTH,
			// 	current: 0,
			// 	active: false,
			// 	readyForBreak: false,
			// 	onShortBreak: false,
			// 	onLongBreak: false,
			// 	theme: createMuiTheme({
			// 		palette: {
			// 			primary: green,
			// 		},
			// 	}),
			// 	id: null,
			// });

			resetTimer();
		} else if (
			!isOnShortBreak &&
			!isOnLongBreak &&
			timeElapsed === Constants.POMODORO_LENGTH
		) {
			playAlarm();

			document.title = Constants.THINK_STRAIGHT;

			clearInterval(intervalId);

			// this.setState({
			// 	active: false,
			// 	current: 0,
			// 	theme: createMuiTheme({
			// 		palette: {
			// 			primary: isTimerActive ? green : red,
			// 		},
			// 	}),
			// 	readyForBreak: true,
			// 	completedPomodoros: completedPomodoros + 1,
			// });

			setIsTimerActive(false);
			setTimeElapsed(0);
			setButtonTheme(createMuiTheme({
				palette: {
					primary: isTimerActive ? green : red,
				},
			}));
			setIsReadyForBreak(true);
			setCompletedPomodoros(completedPomodoros + 1);

			// Local Storage of Pomodoros
			let today = moment().format("l"),
				key =
					Constants.THINK_STRAIGHT_KEY +
					Constants.COMPLETED +
					Constants.DATE +
					today;

			if (!localStorage.getItem(key)) {
				localStorage.setItem(key, 1);
			} else {
				localStorage.setItem(
					key,
					parseInt(localStorage.getItem(key)) + 1
				);
			}
		}
	}

	const toggleTimer = () => {
		setIsTimerActive(!isTimerActive);
		setButtonTheme(createMuiTheme({
			palette: {
				primary: isTimerActive ? green : red,
			}
		}));

		// this.setState({
		// 	active: !this.state.active,
		// 	theme: createMuiTheme({
		// 		palette: {
		// 			primary: this.state.active ? green : red,
		// 		},
		// 	}),
		// });

		if (isTimerActive) {
			document.title = Constants.PAUSED;
			clearInterval(intervalId);
		} else {
			var refreshIntervalId = setInterval(incrementTimer, 1000);

			document.title = Constants.FOCUSING;

			setIntervalId(refreshIntervalId);
			// this.setState({ id: refreshIntervalId });
		}
	};

	const startBreak = () => {
		let breakType = completedPomodoros % 4 === 0 ? "LONG" : "SHORT",
			refreshIntervalId = setInterval(incrementTimer, 1000);

		document.title = Constants.TAKING_A_BREATHER;

		// this.setState({
			// active: true,
			// id: refreshIntervalId,
			// onLongBreak: breakType === "LONG",
			// onShortBreak: breakType === "SHORT",
			// readyForBreak: false,
			// timerLength:
			// 	breakType === "SHORT"
			// 		? Constants.SHORT_BREAK_LENGTH
			// 		: Constants.LONG_BREAK_LENGTH,
		// 	theme: createMuiTheme({
		// 		palette: {
		// 			primary: red,
		// 		},
		// 	}),
		// });
		console.log('AAA yeet')
		setIsTimerActive(true);
		setTimeElapsed(0);
		setIsOnShortBreak(breakType === "SHORT");
		setIsOnLongBreak(breakType === "LONG");
		setIsReadyForBreak(false);
		setTimerLength(	breakType === "SHORT" ? Constants.SHORT_BREAK_LENGTH : Constants.LONG_BREAK_LENGTH);
		setIsReadyForBreak(false);
		setButtonTheme(createMuiTheme({
			palette: {
				primary: red,
			},
		}));
		setIntervalId(refreshIntervalId);
	};

	return (
		<div className='timer'>
			<audio id='audio' src='./done.mp3' type='audio/mpeg'></audio>

			<TimerView
				timerLength={timerLength}
				readyForBreak={isReadyForBreak}
				current={timeElapsed}></TimerView>

			<div className='timer-button' lg={3} md={4} sm={7} xs={8}>
				<ThemeProvider theme={buttonTheme}>
					{isReadyForBreak ? (
						<Button
							className='timer-action-button'
							variant='contained'
							color='primary'
							onClick={startBreak}>
							{isTimerActive ? "Pause" : "Start Break"}
						</Button>
					) : (
						<Button
							className='timer-action-button'
							variant='contained'
							color='primary'
							onClick={toggleTimer}>
							{isTimerActive ? "Pause" : "Start"}
						</Button>
					)}
				</ThemeProvider>
				<TimerActions
					stopPomodoroCycle={
						stopPomodoroCycle
					}></TimerActions>
			</div>

			<Streaks
				completedPomodoros={completedPomodoros}></Streaks>
		</div>
	);
}

export default Timer;
