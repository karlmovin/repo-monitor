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
    autoConnect: false,
    loading: false,
    error: null,
    repository: null,
    repo_url: null,
    clone_url: null,
    repo_status: null,
    latestCommitSha: null,
    commitstatus: null,
    last_update: null
  };

  constructor(props, context) {
    super(props, context);

    // Check URL parameters. If there is one available, use that instead of the
    // Config defaults.
    const urlParams = new URLSearchParams(window.location.search);
    this.state.repoowner = urlParams.has('repoowner')
      ? urlParams.get('repoowner')
      : this.state.repoowner;
    this.state.reponame = urlParams.has('reponame')
      ? urlParams.get('reponame')
      : this.state.reponame;
    this.state.username = urlParams.has('username')
      ? urlParams.get('username')
      : this.state.username;
    this.state.password = urlParams.has('password')
      ? urlParams.get('password')
      : this.state.password;
    this.state.autoConnect = urlParams.has('autoConnect')
      ? urlParams.get('autoConnect')
      : this.state.autoConnect;
  }

  componentDidMount() {
    const { repoowner, reponame, username, password, autoConnect } = this.state;

    // If all the parameters are set, and autoConnect is set - trigger
    // click right away.
    if (repoowner && reponame && username && password && autoConnect) {
      this.handleClick();
    }
  }

  handleChange = name => event => {
    console.log('changing text field ' + name + ' to ' + event.target.value);
    this.setState({ [name]: event.target.value });
  };

  handleClick = () => {
    const { repoowner, reponame, username, password } = this.state;
    this.setState({ loading: true, error: null });

    // TODO: Call GitHub.
    const service = new GitHubService();
    service
      .getRepo(repoowner, reponame, username, password)
      .then(
        function(response) {
          this.setState({
            loading: false,
            repository: response.data,
            clone_url: response.data.clone_url,
            repo_url: response.data.html_url,
            last_update: response.data.updated_at
          });

          service
            .getCommitRuns(repoowner, reponame, 'master', username, password)
            .then(
              function(response) {
                this.setState({});
                console.log(response);
              }.bind(this)
            );
        }.bind(this)
      )
      .catch(
        function(error) {
          console.log(error);
          this.setState({
            loading: false,
            error:
              'Oops, something went wrong! Please check your credentials and try again.'
          });
        }.bind(this)
      );
  };

  renderConnect() {
    const { repoowner, reponame, username, password, error } = this.state;

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
        {error && <p className="error">{error}</p>}
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
    const { loading, repository, error } = this.state;

    // Add animation to the card if an error ocurred.
    let cardClassNames = 'root-card animated';
    if (error) {
      cardClassNames += ' wobble';
    }

    return (
      <Card className={cardClassNames}>
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
