FROM debian:oldstable

RUN apt update
RUN apt upgrade -y
RUN apt install nginx -y
RUN apt autoremove -y
RUN apt clean

COPY website /var/www/html
RUN chown -R www-data:www-data /var/www/html
RUN chmod -R 755 /var/www/html

COPY conf/nginx.conf /etc/nginx/conf.d/default.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]
