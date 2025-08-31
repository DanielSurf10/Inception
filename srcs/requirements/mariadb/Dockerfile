FROM debian:oldstable

RUN apt update \
	&& apt upgrade -y \
	&& apt install mariadb-server -y \
	&& apt clean

RUN mkdir -p /var/run/mysqld \
	&& chown -R mysql:mysql /var/run/mysqld \
	&& chmod 755 /var/run/mysqld /var/lib/mysql

COPY conf/my.cnf etc/mysqld/my.cnf
COPY tools/entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
