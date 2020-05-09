import React from "react";
import Grid from '@material-ui/core/Grid';
import Timer from "./components/Timer";

import "./App.scss";

function App() {

	return (
		<div className='App'>
			<Grid
				container
				spacing={0}
				// direction="column"
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
