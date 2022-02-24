FROM php:7.4.28-zts-alpine3.14
RUN yes | apk apk update && yes | apk add curl  unzip 
RUN curl -sS https://getcomposer.org/installer | php
RUN mv composer.phar /usr/local/bin/composer

