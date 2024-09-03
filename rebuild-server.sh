sudo docker-compose down --remove-orphans
sudo git pull
envsubst '${DOMAIN}' < ./nginx/nginx.conf.template > ./nginx/nginx.conf
sudo docker-compose up --build -d
