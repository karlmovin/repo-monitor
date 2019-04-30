[![Build Status](https://dev.azure.com/baarsoe/repo-monitor/_apis/build/status/fredrikfloven.repo-monitor?branchName=master)](https://dev.azure.com/baarsoe/repo-monitor/_build/latest?definitionId=1&branchName=master)

# Repo Monitor

This is a web-based (React) widget shows information about a repository that you are working on. This will help developers to see activity in the repository without having to browse to GitHub and refresh the page all the time. 

![Widget screenshot 1](/images/widget1.png "Widget screenshot 1")

The widget uses the GitHub REST API v3 ([https://developer.github.com/v3/](https://developer.github.com/v3/)) and requires you to authenticate using your username/password or a personal access token. See this reference for how to create a personal access token: [https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line).

The widget also comes with lively animations.

![Wrong password](/images/error.gif "Wrong password")

## Config
This project uses a configuration file to set the default values of in the widget. This file should be named **config.js** and placed in the **src** folder. This template can be used to create your file.

```js
export default {
    repoowner: '',
    reponame: '',
    branchname: '',
    username: '',
    password: ''
};
```

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

![Build pipeline run](/images/build_pipeline.png "Build pipeline run")

The build pipeline configuration is defined as follows ([azure-pipelines.yml](azure-pipelines.yml)):

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
Once the project is built successfully and all the checks have been passed, the code will be continuously published to a website: [https://dd2482-devops.azurewebsites.net/](https://dd2482-devops.azurewebsites.net/).

The release pipeline configuration is defined as follows.

```yaml
steps:
- task: AzureRmWebAppDeployment@4
  displayName: 'Deploy Azure App Service'
  inputs:
    azureSubscription: '$(Parameters.ConnectedServiceName)'
    WebAppName: '$(Parameters.WebAppName)'
```

#### URL Parameters
The widget can be initialized with default values that override the default values set in the **config.js** file using URL query parameters.

1. repoowner (string): name of the repository owner.
1. reponame (string): name of the repository.
1. repoowner (string): name of the repository.
1. branchname (string): name of the branch.
1. username (string): name of the user.
1. password (string): password or personal access token for the user.
1. autoConnect (bool): if all the parameters are filled in, trigger the widget to automatically connect to the repository.

### Disclaimer ###
**THIS CODE IN THIS REPOSITORY IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

