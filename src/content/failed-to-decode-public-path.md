---
layout: post
title: Failed to decode %PUBLIC_PATH%
author: Jonathan Eckman
date: 2018-02-06T07:03:47.149Z
tags: ["React"]
---

## Problem
I've been dabbling in React and recently discovered the amazing [`create-react-app`](https://github.com/facebook/create-react-app) tool. Here's a unique problem I ran into when using it, and my solution.
1. In [Visual Studio Team Services](https://www.visualstudio.com/team-services/) (VSTS), I created a new project called "My Project". The space is important. 
2. VSTS will create a default git repository using the same name as the project.
3. I pushed the React app to source control.
4. The repo URL is `https://myaccount.visualstudio.com/_git/My%20App` (notice the encoded space), so cloning it will put it into a `My%20App` directory.
5. Run `npm start`
6. In terminal, you'll see the error:
    `"Failed to decode param '/%PUBLIC_URL%/favicon.ico'`
    and 400 bad request errors in the developer console.  

## Solution
The solution is simple, but not immediatley obvious. The `%` in the file path was breaking the build task searching for the `%PUBLIC_URL%` tokens in `index.html`.

My fix was to rename the project folder. I also renamed the repo to spare the rest of the devs on my team. 