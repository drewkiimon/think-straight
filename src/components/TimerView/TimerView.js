import React, { Component } from "react";
import * as Constants from "../../constants/constants";

import "./TimerView.scss";

class TimerView extends Component {
	getTime() {
		var minutes = ((this.props.timerLength - this.props.current) / 60) | 0,
			seconds =
				String((this.props.timerLength - this.props.current) % 60)
					.length === 1
					? "0" + ((this.props.timerLength - this.props.current) % 60)
					: (this.props.timerLength - this.props.current) % 60;

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
