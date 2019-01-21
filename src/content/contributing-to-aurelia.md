---
layout: post
title: Your First Open Source Contribution
author: Jonathan Eckman
date: 2018-01-07T07:03:47.149Z
tags: ["Aurelia"]
---

I recently had the opportunity to contribute to the Aurelia framework. Aside from a handful of small changes made using GitHub's in-browser code editor, this was my first experience contributing to an open source project. I'm hoping that documenting what I've learned will help those who have wanted to contribute to an open source project but aren't sure where to start or how the pieces fit together.

## Planning
Before doing anything, look through the active issues to see if your idea is already being tracked. If not, create a new issue describing the bug you'd like to fix or the feature you wish to add. Discuss the proposed changes with someone on the projects core team. In my case, I seeked to start the conversation on the GitHub issue, in [Aurelia's Gitter](https://gitter.im/aurelia/Discuss), or in [Aurleia's Discourse](https://discourse.aurelia.io/). I found that the core team members were [listed in GitHub](https://github.com/orgs/aurelia/people) but most are already easy to spot by the Aurelia logo in their profile picture, such as in Rob Eisenberg's picture shown below.

![Rob Eisenberg's GitHub Picture](/img/rob.png)

Read the contribution guidelines. Aurelia's [contribution guidelines](https://github.com/DurandalProject/about/blob/master/CONTRIBUTING.md#feature) state that small changes can be crafted and submitted, but large changes should be coordinated with the team. I chose to create an issue even though my change was small. In my experience, lack of coordination often leads to wasted time so I wanted the team to be aware of my idea before I started working on it. I've also gotten into the habit of associating my changes with a work item. By creating an issue now, I'll have it ready to reference when I submit a pull request.

## Project Setup
Create an isolated copy of the repository by [forking](https://help.github.com/articles/fork-a-repo/) it. This is as simple as clicking the fork button in the top right corner of the repository you wish to contribute to.

![GitHub Fork Button](/img/aurelia-binding-repo.png)

[Clone](https://help.github.com/articles/cloning-a-repository/) the forked repository to your local workstation and open it in your IDE or text editor of choice. I use [Visual Studio Code](https://code.visualstudio.com/). It's good practice to work in topic branches instead of directly in master. Create and checkout a topic branch with:

```
git checkout -b my-new-feature
```

From here, each project will be different. In my case, all of Aurelia projects contain a `readme.md` file that describe how to set up the project. Usually this includes downloading dependencies, running a build script, and executing tests. Complete all steps to ensure the project builds and is working as expected. 

## Develop and Test
Instead of blindly modifying an API and hoping for the best, I need to see my changes in the wild. To do this, I needed a front end application to test with. I chose to generate a new one using the [Aurelia CLI](http://aurelia.io/docs/build-systems/aurelia-cli#creating-a-new-aurelia-project) but you may use an existing app if you have one handy. Using the CLI is as simple as running the following from your destination directory:

```
npm install aurelia-cli -g
au new --here
```

Next I created a link between the cloned Aurelia source code and my front end app. Think of this as referencing a package on your workstation instead of the one downloaded to `node_modules`. Navigate to the root of the Aurelia project and run: 

```
npm link
```

Navigate to the root of the front end app and run the command below. In my case, I was testing a change to `aurelia-binding`. Change this to whatever module you're working with. 

```
npm link aurelia-binding
```

Make your changes to the Aurelia library, build the project, then jump over to your front end app to test the change. Repeat until perfect. 

To ensure you didn't introduce a regression bug, run the same test script you did during project setup. This usually looks something like `karma start` or `jest`.

## Submit
As you [commit](https://git-scm.com/docs/git-commit) changes, make sure to follow the projects commit message guidelines. As an example, you can find Aurelia's guidelines [here](https://github.com/DurandalProject/about/blob/master/CONTRIBUTING.md#commit). For examples on how to craft the perfect commit message, refer to the commit history of your projects repository. Push your changes to the server then create a [pull request](https://help.github.com/articles/about-pull-requests/) by clicking the big green "new pull request" button on the destination repository.

![GitHub Pull Request Button](/img/aurelia-binding-pr.png)

Include the id of the issue you are working from to associate it with your pull request. Provide a helpful description so the code reviewer understands your changes then click submit. 

## Cleanup
Optionally, you may want to remove the symlink we created with `npm link` so that your front end references the library it downloaded from the npm registry instead of the local copy. To do this, simply run the following from the root of your front end app.

```
npm unlink aurelia-binding
```

And from the root of the Aurelia project:

```
npm unlink
```





