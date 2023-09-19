#!/bin/bash
# Copy this script to $HOME and run it

githubtodo=git@github.com:dreamerslab/express-todo-example.git
githubconfig=git@github.com:dreamerslab/configs.git
localconfig=/home/bibi/configs
tmp=/home/bibi/tmp
path=/home/nodejs/todo
current="$path$(date +"%Y%m%d%H%M%S")"

# Exit script on error
set -e

echo 'Cloning repo from GitHub...'
sudo rm -rf $tmp
sudo rm -rf $localconfig
git clone $githubtodo $tmp
git clone $githubconfig $localconfig
echo '...done!'
echo ''

echo 'Cloning configs...'
sudo cp -f /home/bibi/configs/todo/db.js /home/bibi/tmp/db.js
echo '...done!'
echo ''

echo 'Move to nodejs user tmp & change owner...'
sudo mv $tmp $current
sudo chown -R nodejs:www-data $current
echo '...done!'
echo ''

echo 'Installing dependency modules...'
echo 'Switch user to nodejs'
sudo -u nodejs bash -c "cd $current && npm install -p"
echo '...done!'
echo ''

echo 'Stopping todo server...'
sudo systemctl stop todo.service
echo '...done!'
echo ''

echo 'Switching the server to the latest version...'
sudo rm -rf $path
sudo cp -R $current $path
sudo chown -R nodejs:www-data $path
echo '...done!'
echo ''

echo 'Starting todo server...'
sudo systemctl start todo.service
echo '...done!'
echo ''
