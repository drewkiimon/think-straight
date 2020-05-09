import React from "react";
import "./App.scss";
import Grid from '@material-ui/core/Grid';

// Components
import Timer from "./components/Timer";

function App() {

	return (
		<div className='App'>
			<Grid
				container
				spacing={0}
				direction="column"
				alignItems="center"
				justify="center"
				style={{ minHeight: '100vh' }}
				>

				<Grid item xs={12}>
					<Timer></Timer>
				</Grid>   

			</Grid> 
		</div>
	);
}

export default App;
