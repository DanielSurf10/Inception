#!/bin/bash

set -e

if [ -f /var/www/html/wp-config-sample.php ]; then
    rm -rf /var/www/html/wp-config-sample.php
    rm -rf /var/www/html/index.html

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

exec php-fpm8.1 -F
