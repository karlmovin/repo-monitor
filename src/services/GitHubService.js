import axios from 'axios';

export default class GitHubService {
  getRepo(repoowner, reponame, username, password) {
    username = username || repoowner;
    return axios.get(
      'https://api.github.com/repos/' + repoowner + '/' + reponame,
      {
        auth: {
          username: username,
          password: password
        }
      }
    );
  }

  getCommit(repoowner, reponame, commit, username, password) {
    username = username || repoowner;
    return axios.get(
      'https://api.github.com/repos/' +
        repoowner +
        '/' +
        reponame +
        '/commits/' +
        commit,
      {
        auth: {
          username: username,
          password: password
        }
      }
    );
  }

  getCommitRuns(repoowner, reponame, commit, username, password) {
    username = username || repoowner;
    return axios.get(
      'https://api.github.com/repos/' +
        repoowner +
        '/' +
        reponame +
        '/commits/' +
        commit +
        '/check-runs',
      {
        auth: {
          username: username,
          password: password
        },
        headers: { Accept: 'application/vnd.github.antiope-preview+json' }
      }
    );
  }
}
