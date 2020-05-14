import React, { Component } from "react";
import * as Constants from "../../constants/constants";

import "./TimerView.scss";

class TimerView extends Component {
	getTime() {
		var timeElapsed = this.props.timerLength - this.props.current,
			minutes = (timeElapsed / 60) | 0,
			seconds =
				String(timeElapsed % 60).length === 1
					? "0" + (timeElapsed % 60)
					: timeElapsed % 60;

		return minutes + ":" + seconds;
	}

	render() {
		return (
			<div className='timer-view'>
				{this.props.readyForBreak ? Constants.BREAK : this.getTime()}
			</div>
		);
	}
}

export default TimerView;
