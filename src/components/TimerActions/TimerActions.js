import React, { Component } from "react";
import * as Constants from "./../../constants/constants";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import "./TimerActions.scss";

class TimerActions extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isOpen: null,
		};

		this.toggleMenu = this.toggleMenu.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.stopPomodoroCycle = this.stopPomodoroCycle.bind(this);
	}

	toggleMenu(event) {
		this.setState({ isOpen: event.currentTarget });
	}

	stopPomodoroCycle() {
		this.props.stopPomodoroCycle();
		this.setState({ isOpen: null });
	}

	handleClose() {
		this.setState({ isOpen: null });
	}

	render() {
		return (
			<div className='timer-actions'>
				<IconButton
					className='timer-actions-button'
					aria-controls='simple-menu'
					aria-haspopup='true'
					onClick={this.toggleMenu}>
					<i className='fas fa-chevron-circle-down'></i>
				</IconButton>
				<Menu
					id='simple-menu'
					anchorEl={this.state.isOpen}
					keepMounted
					open={Boolean(this.state.isOpen)}
					onClose={this.handleClose}>
					<MenuItem onClick={this.stopPomodoroCycle}>
						{Constants.RESET}
					</MenuItem>
					{/* <MenuItem onClick={this.handleClose}>
						{Constants.START_SHORT_BREAK}
					</MenuItem> */}
				</Menu>
			</div>
		);
	}
}

export default TimerActions;
