[![Build Status](https://dev.azure.com/baarsoe/repo-monitor/_apis/build/status/fredrikfloven.repo-monitor?branchName=master)](https://dev.azure.com/baarsoe/repo-monitor/_build/latest?definitionId=1&branchName=master)

# Repo Monitor

This is a web-based (React) widget shows information about a repository that you are working on. This will help developers to see activity in the repository without having to browse to GitHhub and refresh the page all the time. 

The widget uses the GitHub REST API v3 ([https://developer.github.com/v3/](https://developer.github.com/v3/)) and requires you to authenticate using your username/password or a personal access token. See this reference for how to create a personal access token: [https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line).

## CI/CD

This project is using Azure DevOps and Azure Pipelines ([https://azure.microsoft.com/en-us/services/devops/pipelines/](https://azure.microsoft.com/en-us/services/devops/pipelines/)) for its CI/CD practices.

The CI steps involved are:
1. Start a new Ubuntu-16.04 VM.
1. Downloading the **config.js** file from the secret store (put in Azure Pipelines).
1. 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
