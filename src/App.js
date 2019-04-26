import React from 'react';
import RootCard from './components/RootCard';
import { createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import blue from '@material-ui/core/colors/blue';
import pink from '@material-ui/core/colors/pink';
import './App.css';

const theme = createMuiTheme({
	palette: {
    primary: blue,
    secondary: pink
  }
});

function App() {
	return (
		<div className="App">
			<MuiThemeProvider theme={theme}>
				<RootCard />
			</MuiThemeProvider>
		</div>
	);
}

export default App;
