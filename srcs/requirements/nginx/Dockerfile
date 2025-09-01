FROM debian:oldstable

RUN apt update
RUN apt upgrade -y
RUN apt install nginx openssl -y
RUN apt autoremove -y
RUN apt clean

RUN openssl req -batch -x509 -sha256 -nodes -newkey rsa:2048 -days 365 \
	-keyout /etc/ssl/private/private.key \
	-out /etc/ssl/certs/certificate.crt \
	-subj "/C=BR/ST=SP/L=Sao Paulo/O=42sp/CN=danbarbo.42.fr"

COPY	./conf/nginx.conf /etc/nginx/conf.d

RUN chmod 755 /var/www
RUN chown -R www-data:www-data /var/www
ENTRYPOINT ["nginx", "-g", "daemon off;"]
