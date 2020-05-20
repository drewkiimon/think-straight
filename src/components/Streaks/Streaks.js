import React from "react";
import "./Streaks.scss";

const Streak = (props) => {
	var streaks = [];

	for (var streak = 0; streak < props.completedPomodoros; streak++) {
		streaks.push(<i key={streak} className='fas fa-fire-alt'></i>);
	}

	return <div className='streaks'>{streaks}</div>;
}

export default Streak;
