FROM php:7.4.28-zts-alpine3.14
RUN curl -sS https://getcomposer.org/installer | php \
    && mv composer.phar /usr/local/bin/composer \
    && apk add git = latest \
    && git clone https://github.com/zaki-re/LaraStart.git 
WORKDIR /LaraStart
RUN composer install
COPY .env.example .env
RUN php artisan key:generate
CMD ["php","artisan","serve"]



