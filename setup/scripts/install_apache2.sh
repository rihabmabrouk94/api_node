sudo su;

service nginx stop;

if [ -e /etc/apache2/apache2.conf ]
then
        echo "apache2 found."
else
        echo "apache2 not found."
        apt-get update -y;
        apt-get upgrade -y;
        apt-get install apache2 -y;
fi

service apache2 stop;

service apache2 start;
