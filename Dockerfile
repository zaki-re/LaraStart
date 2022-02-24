FROM debian:stable-slim
RUN apt-get update -y \
	&& apt-get install php7.4 curl php-mbstring php-xml php-pdo php-xdebug zip unzip php7.4-zip php7.4-mysql -y
RUN curl -sS https://getcomposer.org/installer | php
RUN mv composer.phar /usr/local/bin/composer

