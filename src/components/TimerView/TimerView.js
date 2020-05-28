import React from "react";
import * as Constants from "../../constants/constants";

import "./TimerView.scss";

const TimerView = (props) => {
	const getTime = () => {
		var timeElapsed = props.timerLength - props.current,
			minutes = (timeElapsed / (60 * 1000)) | 0,
			seconds = timeElapsed % (60 * 1000);
		
		if (seconds > 10000) seconds = String(seconds).slice(0, 2);
		else if (seconds > 1000) seconds = "0" + String(seconds).slice(0,1);
		else seconds = "00";

		return minutes + ":" + seconds;
	}

	return (
		<div className='timer-view'>
			{props.readyForBreak ? Constants.BREAK : getTime()}
		</div>
	);
}

export default TimerView;
