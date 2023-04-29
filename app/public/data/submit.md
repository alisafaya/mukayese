# How to Submit a new result to the leaderboards

## 1. Fork the repository

Fork the repository by clicking the fork button on the top of the page. This will create a copy of this repository in your account.

## 2. Clone the repository

Now clone the forked repository to your machine. Go to your GitHub account, open the forked repository, click on the code button and then click the copy to clipboard icon.

Open a terminal and run the following git command:

```bash
git clone "url you just copied"
```

## 3. Create a branch

Change to the repository directory on your computer (if you are not already there):

```bash
cd (filename)
```

Now create a branch using the git checkout command:

```bash

git checkout -b your-new-branch-name
```

For example:

```bash
git checkout -b add-alonzo
```

## 4. Make necessary changes and commit those changes

Now open the file in a text editor, add your name to the list, and then save the file. If you go to the project directory and execute the command git status, you'll see there are changes. Add those changes to the branch you just created using the git add command:

```bash
git add .
```

Now commit those changes using the git commit command:

```bash
git commit -m "Add your message here"
```

## 5. Push changes to GitHub

Push your changes using the command git push:

```bash
git push origin <add-your-branch-name>
```

replacing <add-your-branch-name> with the name of the branch you created earlier.

## 6. Submit your changes for review

If you go to your repository on GitHub, you'll see a Compare & pull request button. Click on that button.

Now submit the pull request.

Soon I'll be merging all your changes into the master branch of this project. You will get a notification email once the changes have been merged.

## 7. Congratulations! You've just completed the standard fork -> clone -> edit -> pull request workflow that you'll encounter often as a contributor!

