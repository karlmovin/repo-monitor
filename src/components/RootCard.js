import React from 'react';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';

class RootCard extends React.Component {
  state = {
    owner: 'fredrikfloven',
    reponame: 'repo-monitor',
    pat: ''
  };

  handleChange = name => event => {
    console.log('changing text field ' + name + ' to ' + event.target.value);
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { owner, reponame, pat } = this.state;

    return (
      <Card className="root-card">
        <TextField
          className="text-field"
          label="Repo Owner Name"
          value={owner}
          onChange={this.handleChange('owner')}
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
                <AccountCircle />
              </InputAdornment>
            )
          }}
        />
        <TextField
          className="text-field"
          label="Personal Access Token"
          value={pat}
          onChange={this.handleChange('pat')}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            )
          }}
        />
      </Card>
    );
  }
}

export default RootCard;
