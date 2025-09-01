FROM debian:oldstable

RUN apt update
RUN apt upgrade -y
RUN apt install mariadb-server -y
RUN apt autoremove -y
RUN apt clean

RUN mkdir -p /var/run/mysqld
RUN chown -R mysql:mysql /var/run/mysqld
RUN chmod 755 /var/run/mysqld /var/lib/mysql

COPY conf/my.cnf /etc/mysql/my.cnf
COPY tools/entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
