import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
//import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

import AccountCircle from '@material-ui/icons/AccountCircle';
import Password from '@material-ui/icons/Fingerprint';
import Repo from '@material-ui/icons/Dvr';
import Connect from '@material-ui/icons/Cast';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Success from '@material-ui/icons/Done';
import Fail from '@material-ui/icons/Error';
import Lnk from '@material-ui/icons/Link';

import Code from '@material-ui/icons/Code';
import Copy from '@material-ui/icons/FileCopy';

import GitHubService from '../services/GitHubService';
import RootSpinner from './RootSpinner';
import Config from '../config';

class RootCard extends React.Component {
  state = {
    repoowner: Config.repoowner,
    reponame: Config.reponame,
    branchname: Config.branchname,
    username: Config.username,
    password: Config.password,
    showPassword: false,
    autoConnect: false,
    loading: false,
    error: null,
    repository: null,
    repo_url: null,
    clone_url: null,
    ssh_url: null,
    repo_status: null,
    author: null,
    committer: null,
    message: null,
    latest_commit_sha: null,
    commit_status: null,
    last_update: null,
    commit_url: null,
    ci_url: null
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
    this.state.branchname = urlParams.has('branchname')
      ? urlParams.get('branchname')
      : this.state.branchname;
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
    const {
      repoowner,
      reponame,
      branchname,
      username,
      password,
      autoConnect
    } = this.state;

    // If all the parameters are set, and autoConnect is set - trigger
    // click right away.
    if (
      repoowner &&
      reponame &&
      branchname &&
      username &&
      password &&
      autoConnect
    ) {
      this.handleClick();
    }
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleClickCopy = () => {
    console.log('TODO');
  };

  handleClickRedirect = () => {
    console.log('TODO');
  };

  handleClick = () => {
    const { repoowner, reponame, branchname, username, password } = this.state;
    this.setState({ loading: true, error: null });

    // TODO: Call GitHub.
    const service = new GitHubService();
    service
      .getRepo(repoowner, reponame, username, password)
      .then(
        function(response) {
          console.log(response.data);
          var data = response.data;
          this.setState({
            loading: false,
            repository: data,
            clone_url: data.clone_url,
            ssh_url: data.ssh_url,
            repo_url: data.html_url,
            last_update: data.updated_at
          });

          service
            .getCommit(repoowner, reponame, branchname, username, password)
            .then(
              function(response) {
                var data = response.data;
                //console.log(response);
                this.setState({
                  latest_commit_sha: data.sha,
                  commit_url: data.html_url,
                  author: data.commit.author.name,
                  committer: data.commit.committer.name,
                  message: data.commit.message
                });
                service
                  .getCommitRuns(
                    repoowner,
                    reponame,
                    branchname,
                    username,
                    password
                  )
                  .then(
                    function(response) {
                      var data = response.data.check_runs[0];
                      //console.log(response);
                      this.setState({
                        ci_url: data.details_url,
                        commit_status: data.status
                      });
                    }.bind(this)
                  );
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
    const {
      repoowner,
      reponame,
      branchname,
      username,
      password,
      error
    } = this.state;

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
          label="Branch Name"
          value={branchname}
          onChange={this.handleChange('branchname')}
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
          type={this.state.showPassword ? 'text' : 'password'}
          onChange={this.handleChange('password')}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Password />
              </InputAdornment>
            ),
            endAdornment: (
              <IconButton
                aria-label="Toggle password visibility"
                onClick={this.handleClickShowPassword}
              >
                {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
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
    return (
      <div>
        <CardHeader title={this.state.reponame} />
        <IconButton
          aria-label="Link"
          value={this.state.repo_url}
          onClick={this.handleClickCopy}
        >
          <Lnk />
        </IconButton>
        HTTPS:
        <IconButton
          aria-label="Copy"
          value={this.state.clone_url}
          onClick={this.handleClickCopy}
        >
          <Copy />
        </IconButton>
        SSH:
        <IconButton
          aria-label="Copy"
          value={this.state.clone_url}
          onClick={this.handleClickCopy}
        >
          <Copy />
        </IconButton>
        <br />
        <Card>
          <Typography component="div" noWrap>
            {this.state.message}
          </Typography>
          <Chip
            label={JSON.stringify(this.state.latest_commit_sha).substring(1, 8)}
          />
          <Chip label={<Code />} onClick={this.handleClickRedirect} />
          <div>
            {this.state.committer}
            {' committed at '}
            {this.state.last_update}
            <Chip
              color="default"
              avatar={
                <Avatar>
                  <Success />
                </Avatar>
              }
              label={this.state.commit_status}
              onClick={this.handleClickRedirect}
            />
          </div>
        </Card>
      </div>
    );
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
