## Project setup
``` bash
npm install
```
### Compiles and hot-reloads for development
``` bash
npm run serve
```
### Compiles and minifies for production
``` bash
npm run build
```
### Lints and fixes files
``` bash
npm run lint
```
---
## Tools and IDE setup
### Install nvm and node
- https://github.com/coreybutler/nvm-windows/releases/download/1.1.9/nvm-setup.exe

- Install node lts version
``` bash
nvm version

# install current lts version
# https://nodejs.org/ko/
nvm install 16.15.1
nvm use 16.15.1

node -v
```
-  Change npm registry
``` bash
npm set registry http://nexus-dev.kyowon.co.kr/repository/npm-public/
npm set strict-ssl false
```
- Other useful command
``` bash
# check current node version
nvm current

# check installed list
nvm list

# check npm version
npm -v

# npm upgrade
npm i -g npm
```
### Install vscode extensions
``` bash
# required
code --install-extension EditorConfig.EditorConfig
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension stylelint.vscode-stylelint
code --install-extension Vue.volar

# optional (but recommended)
code --install-extension GitHub.github-vscode-theme
code --install-extension IronGeek.vscode-env
code --install-extension eamodio.gitlens
code --install-extension oderwat.indent-rainbow
code --install-extension christian-kohler.npm-intellisense
code --install-extension 2gua.rainbow-brackets
code --install-extension jasonnutter.search-node-modules
code --install-extension wayou.vscode-todo-highlight
code --install-extension vscode-icons-team.vscode-icons
```
### Install git
- https://github.com/git-for-windows/git/releases/download/v2.37.0.windows.1/Git-2.37.0-64-bit.exe
- Set configuration
``` bash
git config core.autocrlf false

git config --global user.name "Your Name"
git config --global user.email you@example.com
```
