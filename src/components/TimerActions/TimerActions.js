import React, { Component } from "react";
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
	}

	toggleMenu(event) {
		this.setState({ isOpen: event.currentTarget });
	}

	handleClose() {
		this.setState({ isOpen: null });
	}

	render() {
		return (
			<div className="timer-actions">
				<IconButton
					aria-controls='simple-menu'
					aria-haspopup='true'
					onClick={this.toggleMenu}>
					<i className="fas fa-chevron-circle-down"></i>
				</IconButton>
				<Menu
					id='simple-menu'
					anchorEl={this.state.isOpen}
					keepMounted
					open={Boolean(this.state.isOpen)}
					onClose={this.handleClose}>
					<MenuItem onClick={this.handleClose}>Start Cycle</MenuItem>
					<MenuItem onClick={this.handleClose}>Stop</MenuItem>
					<MenuItem onClick={this.handleClose}>
						Restart Cycle
					</MenuItem>
				</Menu>
			</div>
		);
	}
}

export default TimerActions;
