# Run scripts:
chmod -R 775 ./setup

./setup/scripts/install_apache2.sh

! Clone project

./setup/scripts/install_forever.sh


# Or
## install Apache 2
service nginx stop;

apt-get update;

apt-get upgrade;

apt-get install apache2;

service apache2 enable;



## Clone project
cd /home;

git clone git@bitbucket.org:maraboutdev/api_erp_cloud.git

cd /home/api_erp_cloud;

npm install;



## Install forever

npm install forever -g;

forever start -l forever.log -o forever_out.log -e forever_err.log --append /var/wwww/api_erp_cloud/server.js;

forever start -c "npm run staging  --prefix /var/www/api_erp_cloud" ./ -l /var/log/marabout/api_erp_cloud.log -o /var/log/marabout/api_erp_cloud_out.log -e /var/log/marabout/api_erp_cloud_err.log --append;

forever start -c "npm run staging4  --prefix /var/www/api_erp_cloud" ./ -l /var/log/marabout/api_erp_cloud.log -o /var/log/marabout/api_erp_cloud_out.log -e /var/log/marabout/api_erp_cloud_err.log --append;

forever stopall;

# create ProxyPreserveHost
cd /home/api_erp_cloud;

cp ./setup/clouderp_api.conf /etc/apache2/sites-available/clouderp_api.conf;

a2ensite clouderp_api.conf;

service apache2 restart;

