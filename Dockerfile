FROM  bitnami/laravel:9.1.1-debian-10-r1
RUN apt update \
	&& apt install -y --no-install-recommends git \
    && git clone https://github.com/zaki-re/LaraStart.git 
WORKDIR /LaraStart
RUN composer install
RUN php artisan key:generate
RUN php artisan serve 


