#!/bin/bash

set -e

if [ ! -f /var/www/html/wp-config.php ]; then
    wp --allow-root config create \
    --dbname="$DB_NAME" \
    --dbuser="$DB_USER" \
    --dbpass="$DB_PASSWORD" \
    --dbhost="$DB_HOST" \
    --dbprefix="wp_"

    wp core install --allow-root \
        --path=/var/www/html \
        --title="$TITLE" \
        --url=$DOMAIN \
        --admin_user=$ADMIN_NAME \
        --admin_password=$ADMIN_PASSWORD \
        --admin_email=$ADMIN_EMAIL

    wp user create --allow-root \
        --path=/var/www/html \
        "$USER_NAME" \
        "$USER_EMAIL" \
        --user_pass=$USER_PASSWORD \
        --role='author'
fi

wp --allow-root theme activate twentytwentyfour

exec php-fpm8.1 -F
