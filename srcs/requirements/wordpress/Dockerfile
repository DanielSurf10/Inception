FROM debian:oldstable

WORKDIR /var/www/html

RUN apt update
RUN apt upgrade -y
RUN apt install lsb-release apt-transport-https ca-certificates wget -y
RUN wget -qO /etc/apt/trusted.gpg.d/php.gpg https://packages.sury.org/php/apt.gpg
RUN echo "deb https://packages.sury.org/php $(lsb_release -sc) main" > /etc/apt/sources.list.d/php.list
RUN apt update
RUN apt install php8.1 php8.1-fpm php8.1-mysql mariadb-client wordpress wget -y
RUN apt autoremove -y
RUN apt clean

RUN mkdir -p /run/php
RUN chown -R www-data:www-data /var/www/html
RUN chmod 755 /var/www/html

RUN wget -O /usr/local/bin/wp https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
RUN chmod +x /usr/local/bin/wp
RUN wp core download --allow-root --path=/var/www/html

COPY conf/www.conf /etc/php/8.1/fpm/pool.d/www.conf

COPY tools/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
