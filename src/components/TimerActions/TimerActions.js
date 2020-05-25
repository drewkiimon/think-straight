import React, { useState } from "react";
import * as Constants from "./../../constants/constants";
// import IconButton from "@material-ui/core/IconButton";
// import Menu from "@material-ui/core/Menu";
// import MenuItem from "@material-ui/core/MenuItem";
import {Button, Menu, MenuItem, IconButton} from "@material-ui/core/";

// For modal
import { makeStyles, createMuiTheme, ThemeProvider  } from '@material-ui/core/styles';
import { red } from "@material-ui/core/colors";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import "./TimerActions.scss";

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

const TimerActions = props => {
	const classes = useStyles();

	const [isOpen, setIsOpen] = useState(null);
	const [isModalOpen, setIsModalOpen] = React.useState(false);
	const redTheme = createMuiTheme({
		palette: {
			primary: red,
		},
	});

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};
  
	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const handleRemovePomodoros = () => {
		props.clearPomodoros();

		handleCloseModal();
		handleCloseMenu();
	};

	const toggleMenu = (event) => {
		setIsOpen(event.currentTarget);
	}

	const stopPomodoroCycle = () => {
		props.stopPomodoroCycle();
		setIsOpen(null);
	}

	const handleCloseMenu = () => {
		setIsOpen(null);
	}

	return (
		<div className='timer-actions'>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={isModalOpen}
				onClose={handleCloseModal}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
				timeout: 500,
				}}
			>
				<Fade in={isModalOpen}>
					<div className={classes.paper}>
						<h2 id="transition-modal-title">remove completed</h2>
						<p id="transition-modal-description">this cannot be undone</p>
						<ThemeProvider theme={redTheme}>
							<Button
								variant='contained'
								color='primary'
								onClick={handleRemovePomodoros}>
								remove.
							</Button>
						</ThemeProvider>
						<Button
							onClick={handleCloseModal}>
							nevermind.
						</Button>
					</div>
				</Fade>
			</Modal>

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
				onClose={handleCloseMenu}>
				<MenuItem onClick={stopPomodoroCycle}>
					{Constants.RESET}
				</MenuItem>
				<MenuItem onClick={handleOpenModal}>
					remove completed.
				</MenuItem>
			</Menu>
		</div>
	);
}

export default TimerActions;
