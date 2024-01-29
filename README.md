# This is the GitHub repository for IM3180 Project
...Description...
## Software needed:
NodeJS, JDK, Android Studio, FireBase

# Getting started
## Installing requirements
**JDK** : https://www3.ntu.edu.sg/home/ehchua/programming/howto/jdk_howto.html

**NodeJS** : https://nodejs.org/en/download

**Android Studio** : https://www3.ntu.edu.sg/home/ehchua/programming/android/Android_HowTo.html

**FireBase** : rnfirebase.io

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
