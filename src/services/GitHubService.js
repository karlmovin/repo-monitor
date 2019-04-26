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
}
