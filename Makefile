USER			:=	danbarbo

MARIA_DB_DIR	:=	/home/danbarbo/data/mariadb
WP_PHP_DIR		:=	/home/danbarbo/data/wordpress
COMPOSE_FILE	:=	srcs/docker-compose.yml

all: config up

config:
	@if [ ! -f srcs/.env ]; then \
		echo "Error: .env file not found in srcs/"; \
		exit 1; \
	fi

	@sudo chmod 644 /etc/hosts

	@sudo mkdir -p ${MARIA_DB_DIR}
	@sudo mkdir -p ${WP_PHP_DIR}

	@if ! grep -q 'danbarbo' /etc/hosts ; then \
		echo "127.0.0.1 danbarbo.42.fr" | sudo tee -a /etc/hosts; \
	fi

up: build
	@if [ -z "$$(docker-compose -f ${COMPOSE_FILE} ps 2> /dev/null | grep Up)" ] ; then \
		docker-compose -f ${COMPOSE_FILE} up -d; \
	else \
		echo "Containers are still running. Please shut them down"; \
	fi

build:
	docker-compose -f ${COMPOSE_FILE} build

down:
	docker-compose -f ${COMPOSE_FILE} down

ps:
	docker-compose -f ${COMPOSE_FILE} ps

ls:
	docker-compose -f ${COMPOSE_FILE} ls

clean:
	docker-compose -f ${COMPOSE_FILE} down --rmi all --volumes

fclean:
# 	rm srcs/.env
	docker system prune --force --all --volumes
	sudo rm -rf /home/danbarbo/data

re: fclean all

.PHONY: all up config build down ls clean fclean re
