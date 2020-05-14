import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Timer from "../Timer";

class TimerActions extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isOpen: null,
		};

		this.toggleMenu = this.toggleMenu.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}
	// const [anchorEl, setAnchorEl] = React.useState(null);

	toggleMenu(event) {
		this.setState({ isOpen: event.currentTarget });
	}

	handleClose() {
		this.setState({ isOpen: null });
	}

	render() {
		return (
			<div>
				<Button
					aria-controls='simple-menu'
					aria-haspopup='true'
					onClick={this.toggleMenu}>
					Open Menu
				</Button>
				<Menu
					id='simple-menu'
					anchorEl={this.state.isOpen}
					keepMounted
					open={Boolean(this.state.isOpen)}
					onClose={this.handleClose}>
					<MenuItem onClick={this.handleClose}>Profile</MenuItem>
					<MenuItem onClick={this.handleClose}>My account</MenuItem>
					<MenuItem onClick={this.handleClose}>Logout</MenuItem>
				</Menu>
			</div>
		);
	}
}

export default TimerActions;
