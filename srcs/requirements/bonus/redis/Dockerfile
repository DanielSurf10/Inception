FROM debian:oldstable

RUN apt-get update
RUN apt-get install redis-server -y
RUN apt autoremove -y
RUN apt clean

RUN sed -i 's/protected-mode yes/protected-mode no/' /etc/redis/redis.conf
RUN sed -i '/^bind 127.0.0.1/c\bind 0.0.0.0' /etc/redis/redis.conf
RUN sed -i 's/daemonize yes/daemonize no/' /etc/redis/redis.conf

ENTRYPOINT ["redis-server", "/etc/redis/redis.conf"]
