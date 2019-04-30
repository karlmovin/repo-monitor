[![Build Status](https://dev.azure.com/baarsoe/repo-monitor/_apis/build/status/fredrikfloven.repo-monitor?branchName=master)](https://dev.azure.com/baarsoe/repo-monitor/_build/latest?definitionId=1&branchName=master)

# Repo Monitor

This is a web-based (React) widget shows information about a repository that you are working on. This will help developers to see activity in the repository without having to browse to GitHhub and refresh the page all the time. 

The widget uses the GitHub REST API v3 ([https://developer.github.com/v3/](https://developer.github.com/v3/)) and requires you to authenticate using your username/password or a personal access token. See this reference for how to create a personal access token: [https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line).

## Config
This project uses a configuration file to set the default values of in the widget.

## CI/CD

This project is using Azure DevOps and Azure Pipelines ([https://azure.microsoft.com/en-us/services/devops/pipelines/](https://azure.microsoft.com/en-us/services/devops/pipelines/)) for its CI/CD practices.


### Build
The build steps involved are:
1. Start a new Ubuntu-16.04 VM.
1. Downloading the **config.js** file from the secret store (put in Azure Pipelines).
1. Clone the repository.
1. Copy the **config.js** file into the cloned repository.
1. Install Node.js ([https://nodejs.org/en/](https://nodejs.org/en/)).
1. Run **npm install and build** to install dependencies, tests and code compilation.
1. Archive the build artifacts into a .ZIP file ready for deployment (release pipeline).

Below is the build pipeline defined ([azure-pipelines.yml](azure-pipelines.yml)) in a YAML file.

```yaml
trigger:
- master

pool:
  vmImage: 'Ubuntu-16.04'

steps:
- task: DownloadSecureFile@1
  inputs:
    secureFile: 'config.js'

- task: CopyFiles@2
  inputs:
    sourceFolder: $(Agent.TempDirectory)
    contents: 'config.js' 
    targetFolder: 'src'

- task: NodeTool@0
  inputs:
    versionSpec: '10.x'
  displayName: 'Install Node.js'

- script: |
    npm install
    npm run build
  displayName: 'npm install and build'

- task: ArchiveFiles@2
  inputs:
    rootFolderOrFile: 'build' 
    includeRootFolder: false

- task: PublishBuildArtifacts@1
  inputs:
    pathtoPublish: '$(Build.ArtifactStagingDirectory)' 
```

### Release

