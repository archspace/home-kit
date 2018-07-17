#!/bin/sh
echo "Environment installation"
sudo apt-get update
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install vim nodejs

sudo apt-get install bluetooth bluez libbluetooth-dev libudev-dev

cd /home/pi/server/
npm install

echo "install done"

exit 0
