FROM debian:oldstable

RUN apt-get update
RUN apt-get install vsftpd -y
RUN apt autoremove -y
RUN apt clean

COPY conf/vsftpd.conf /etc/vsftpd.conf

RUN mkdir -p /var/run/vsftpd/empty
RUN mkdir -p /var/www/html
RUN chmod -R 755 /var/www/html

COPY tools/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
