#!/bin/bash
#set vi/vim editor
echo "set nocompatible" >> ~/.vimrc

#install vim
sudo apt install -y vim

#install git
sudo add-apt-repository ppa:git-core/ppa
sudo apt-get update
sudo apt install -y git

#install curl
sudo apt install -y curl

#install vscode
curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.gpg
sudo mv microsoft.gpg /etc/apt/trusted.gpg.d/microsoft.gpg
sudo sh -c 'echo "deb [arch=amd64] https://packages.microsoft.com/repos/vscode stable main" > /etc/apt/sources.list.d/vscode.list'
sudo apt update
sudo apt install -y code

#install nvm / node 8.1.2
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
source ~/.nvm/nvm.sh
nvm install 8.1.2

#install yarn
sudo apt install -y yarn

#install google chrome
wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add - 
sudo sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
sudo apt update
sudo apt install -y google-chrome-stable
