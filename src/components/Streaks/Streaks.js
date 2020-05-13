import React, { Component } from "react";
import "./Streaks.scss";

class Streak extends Component {
	render() {
		var streaks = [];

		// this keeps happening with each timer tick
		for (var streak = 0; streak < this.props.completedPomodoros; streak++) {
			streaks.push(<i key={streak} className='fas fa-fire-alt'></i>);
		}

		return <div className='streaks'>{streaks}</div>;
	}
}

export default Streak;
