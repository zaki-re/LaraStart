FROM debian:stable-slim
RUN apt update -y \
	&& apt install php7.4 curl php-mbstring php-xml php-pdo php-xdebug zip unzip php7.4-zip -y
RUN apt-get update | apt-get install php7.4-mysql -y
RUN curl -sS https://getcomposer.org/installer | php
RUN mv composer.phar /usr/local/bin/composer

