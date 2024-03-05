# This is the GitHub repository for IM3180 Project
...Description...
## Software needed:
NodeJS, JDK, Android Studio, FireBase

# Getting started
## Installing requirements

**React Native** : https://reactnative.dev/docs/environment-setup?guide=native

**JDK** : https://www3.ntu.edu.sg/home/ehchua/programming/howto/jdk_howto.html

**NodeJS** : https://nodejs.org/en/download

**Android Studio** : https://www3.ntu.edu.sg/home/ehchua/programming/android/Android_HowTo.html

**FireBase** : rnfirebase.io

## Setting up FireBase

Go to https://console.firebase.google.com

Select IM3180-APP project > Project settings 

In the General pages, scroll down to Your apps.

Download google-services.json and place it in android > app

![image](https://github.com/jojojoelelel/IM3180/assets/31207498/f3f2e9fc-0794-4375-b35c-6c52112be0f1)

![image](https://github.com/jojojoelelel/IM3180/assets/31207498/0333bf23-f921-4dc1-84e7-8f25fc4aa87c)

## Setting up env file for SpotifyAPI

Steps for Spotify API call

Set up .env file in project root folder.

REACT_APP_CLIENT_ID = '…'

REACT_APP_CLIENT_SECRET = '…'

![image](https://github.com/jojojoelelel/IM3180/assets/31207498/ec70a229-a227-489f-bd95-bb37953f01cb)

add .env and google-services.json to .gitignore located in project root folder.

![image](https://github.com/jojojoelelel/IM3180/assets/31207498/883a226c-fd81-4a64-8f2f-4fe1128ca374)

API calls are tentatively stored in src>services>Spotify-web-api.js

## To make calls : 
import * from SpotifyAPI from '../services/Spotify-web-api'

Look at src/screen/Login.js to see examples of how to make calls.

In general, should make calls in try-catch statements.

Copy lines 43 to 98, functions handleRedirect(event), addEventListener('url', handleRedirect) and loginToSpotify(), and useEffects for requestRefreshAccessToken(). These 3 functions handle the initial process of : 

1.Request user’s authorization. Directs user to browser to log in with Spotify.

2.Redirect_uri will redirect the user back to localhost:8081 (the app).

3.The event listener will invoke handleRedirect, which obtains the response code.

4.This response code will be saved as return_Params useState variable, and passed as an input to requestAccessToken(return_Params) to get the access_token (which will expire in 1 hour) used for other API calls.

5.useEffect line 94 to 98 will request a refresh access token after 1 hour automatically.

6.useEffect line 100 to 104 will automatically requestAccessToken after handleRedirect sets the return_Param.

## GitHub setup

NOTE: DO NOT push directly into the remote main branch without discussion.

Git repository URL : https://github.com/jojojoelelel/IM3180.git

Setup
Ensure you have git.
Ensure that your folder is a git repository. If it is not, you can run `git init` to create it as one.
Add the repositories as your remote:
`git remote add origin https://github.com/jojojoelelel/IM3180.git`

NOTE: You can check what is your current branch name by running git status.

# GitHub Workflow - Pushing your code to the remote repository
As much as possible please make sure your code runs correctly before pushing to the repository.

Pull main branch (make sure it is most updated) → Create a new local branch → Make your code changes → Push to new branch in repository → Review/Proof that it works → Create a pull request

## Ensure that you are on the **main** branch of the repository by running `git status`, and have pulled the latest changes from the remote : 
`git pull`

## Create a new branch locally :
`git checkout -b <branch_name>`

Make your changes to the code as needed in this new branch.

## Stage files to be committed into github :
`git add .` OR if you want to select specific files `git add <name of file>`

## Commit the staged files with message :
`git commit -m "<your message, usually something to describe the changes>"`

## Push the committed changes to remote branch :
`git push`

IF it is the first time pushing this branch to the remote :
`git push -u origin <branch_name>`

## Create a pull request :
Title should include the JIRA task ID and a short description. E.g. TASK-123 Implementing AI search 
1. Objective
2. File changes
3. Proof of testing (Screenshots/Recordings)
4. After reviewing together, merge the branch into main

# Pull requests and reviews
Every week, go through all requests together and merge to main.
