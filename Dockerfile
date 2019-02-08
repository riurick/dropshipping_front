FROM centos/httpd-24-centos7

COPY ./dist/dropshipping-front/ /var/www/html/

# git clone
# npm install
# npm run build
