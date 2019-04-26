import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Fab from '@material-ui/core/Fab';

import AccountCircle from '@material-ui/icons/AccountCircle';
import Password from '@material-ui/icons/Fingerprint';
import Repo from '@material-ui/icons/Dvr';
import Connect from '@material-ui/icons/Cast';

import GitHubService from '../services/GitHubService';
import RootSpinner from './RootSpinner';
import Config from '../config';

class RootCard extends React.Component {
	state = {
		repoowner: Config.repoowner,
		reponame: Config.reponame,
		username: Config.username,
		password: Config.password,
		loading: false,
		repository: null
	};

	handleChange = (name) => (event) => {
		console.log('changing text field ' + name + ' to ' + event.target.value);
		this.setState({ [name]: event.target.value });
	};

	handleClick = () => {
		const { repoowner, reponame, username, password } = this.state;
		this.setState({ loading: true });

		// TODO: Call GitHub.
		const service = new GitHubService();
		service
			.getRepo(repoowner, reponame, username, password)
			.then(
				function(response) {
					// handle success
					this.setState({ loading: false, repository: response.data });
					console.log(this.state);
				}.bind(this)
			)
			.catch(function(error) {
				// handle error
				console.log(error);
			});
	};

	renderConnect() {
		const { repoowner, reponame, username, password } = this.state;

		return (
			<div>
				<TextField
					className="text-field"
					label="Repo Owner Name"
					value={repoowner}
					onChange={this.handleChange('repoowner')}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<AccountCircle />
							</InputAdornment>
						)
					}}
				/>
				<TextField
					className="text-field"
					label="Repository Name"
					value={reponame}
					onChange={this.handleChange('reponame')}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<Repo />
							</InputAdornment>
						)
					}}
				/>
				<TextField
					className="text-field"
					label="Username"
					value={username}
					onChange={this.handleChange('username')}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<AccountCircle />
							</InputAdornment>
						)
					}}
				/>
				<TextField
					className="text-field"
					label="Personal Access Token"
					value={password}
					onChange={this.handleChange('password')}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<Password />
							</InputAdornment>
						)
					}}
				/>
				<Fab
					variant="extended"
					aria-label="connect"
					className="connect"
					color="primary"
					onClick={this.handleClick}
				>
					<InputAdornment position="start">
						<Connect />
					</InputAdornment>
					Connect
				</Fab>
			</div>
		);
	}

	renderRepository() {
		const { repository } = this.state;
		return <div>{JSON.stringify(repository.owner)}</div>;
	}

	render() {
		const { loading, repository } = this.state;

		return (
			<Card className="root-card">
				{!repository && (
					<CardHeader
						title="Repository monitor"
						subheader="You can use a password or personal access token to authenticate with GitHub."
					/>
				)}

				<CardContent>
					{!repository && this.renderConnect()}
					{repository && this.renderRepository()}
				</CardContent>

				{loading && <RootSpinner />}
			</Card>
		);
	}
}

export default RootCard;
