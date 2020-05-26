import React from "react";
import * as Constants from "../../constants/constants";

import "./TimerView.scss";

const TimerView = (props) => {
	const getTime = () => {
		var timeElapsed = props.timerLength * 1000 - props.current,
			minutes = (timeElapsed / 60000) | 0,
			seconds =
				String((timeElapsed % 60000) / 1000).length === 1
					? "0" + (timeElapsed % 60000) / 1000
					: String((timeElapsed % 60000) / 1000).substring(0, 2);
		console.log("aaa what", timeElapsed % 60000);
		return minutes + ":" + seconds;
	};

	return (
		<div className='timer-view'>
			{props.readyForBreak ? Constants.BREAK : getTime()}
		</div>
	);
};

export default TimerView;
