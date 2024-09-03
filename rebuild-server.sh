docker-compose -f docker-compose down --remove-orphans
sudo git pull
envsubst '${DOMAIN}' < ./nginx/nginx.conf.template > ./nginx/nginx.conf
docker-compose -f docker-compose up --build -d
