#!/bin/bash
# Install needed dependencies
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the Docker repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update

# Install Docker sub dependencies & certbot
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin certbot gettext-base
sudo service docker start

# Configure Environment Variables
sh env-check.sh

# Runs certbot to use Let's Encrypt to generate ssl certificates for the site
sudo certbot certonly --standalone -d a-iep.org -d $DOMAIN www.$DOMAIN
envsubst '${DOMAIN}' < ./nginx/nginx.conf.template > ./nginx/nginx.conf

# Build and run the Docker containers
cd ./aiep-app
sudo docker-compose up --build -d