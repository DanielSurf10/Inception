#!/bin/bash
set -e

if [ ! -d "/var/lib/mysql/${DB_NAME}" ]; then
	service mariadb start
	mariadb -u root -e "CREATE DATABASE IF NOT EXISTS ${DB_NAME}; \
		CREATE USER '${ADMIN_NAME}'@'wordpress' IDENTIFIED BY '${ADMIN_PASSWORD}'; \
		GRANT ALL ON ${DB_NAME}.* TO '${ADMIN_NAME}'@'wordpress' IDENTIFIED BY '${ADMIN_PASSWORD}'; \
		FLUSH PRIVILEGES;"
	service mariadb stop
fi

exec mysqld_safe
