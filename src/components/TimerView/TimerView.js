import React from "react";
import * as Constants from "../../constants/constants";

import "./TimerView.scss";

const TimerView = (props) => {
	const getTime = () => {
		var timeElapsed = props.timerLength - props.current,
			minutes = (timeElapsed / 60) | 0,
			seconds =
				String(timeElapsed % 60).length === 1
					? "0" + (timeElapsed % 60)
					: timeElapsed % 60;

		return minutes + ":" + seconds;
	}

	return (
		<div className='timer-view'>
			{props.readyForBreak ? Constants.BREAK : getTime()}
		</div>
	);
}

export default TimerView;
