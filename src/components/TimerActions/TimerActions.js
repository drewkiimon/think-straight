import React, { useState } from "react";
import * as Constants from "./../../constants/constants";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import "./TimerActions.scss";

const TimerActions = props => {
	const [isOpen, setIsOpen] = useState(null);

	const toggleMenu = (event) => {
		setIsOpen(event.currentTarget);
	}

	const stopPomodoroCycle = () => {
		props.stopPomodoroCycle();
		setIsOpen(null);
	}

	const handleClose = () => {
		setIsOpen(null);
	}

	return (
		<div className='timer-actions'>
			<IconButton
				className='timer-actions-button'
				aria-controls='simple-menu'
				aria-haspopup='true'
				onClick={toggleMenu}>
				<i className='fas fa-chevron-circle-down'></i>
			</IconButton>
			<Menu
				id='simple-menu'
				anchorEl={isOpen}
				keepMounted
				open={Boolean(isOpen)}
				onClose={handleClose}>
				<MenuItem onClick={stopPomodoroCycle}>
					{Constants.RESET}
				</MenuItem>
			</Menu>
		</div>
	);
}

export default TimerActions;
