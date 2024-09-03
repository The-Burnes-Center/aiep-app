docker-compose -f docker-compose.local.yml down --remove-orphans
sudo git pull
envsubst '${DOMAIN}' < ./nginx/nginx.conf.template > ./nginx/nginx.conf
docker-compose -f docker-compose.local.yml up --build -d
