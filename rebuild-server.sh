sudo docker-compose down
sudo git pull
envsubst '${DOMAIN}' < ./nginx/nginx.conf.template > ./nginx/nginx.conf
sudo docker-compose up --build -d
