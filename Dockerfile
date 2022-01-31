FROM php:7.4-cli
RUN apt-get update \
	&& apt-get install -y --no-install-recommends wget zip
RUN yes | pecl install xdebug \
    && cd /usr/local/etc/php/conf.d/ \
    && echo "zend_extension=$(find /usr/local/lib/php/extensions/ -name xdebug.so)" > xdebug.ini \
    && echo "xdebug.remote_enable=on" >> xdebug.ini \
    && echo "xdebug.remote_autostart=off" >> xdebug.ini
RUN wget -q --no-check-certificate https://phar.phpunit.de/phpunit-9.phar \
	&& mv phpunit-9.phar /usr/local/bin/phpunit \
	&& chmod +x /usr/local/bin/phpunit
RUN wget -q --no-check-certificate https://squizlabs.github.io/PHP_CodeSniffer/phpcs.phar \
	&& mv phpcs.phar /usr/local/bin/phpcs \
	&& chmod +x /usr/local/bin/phpcs
RUN wget -q --no-check-certificate https://phpmd.org/static/latest/phpmd.phar \
	&& mv phpmd.phar /usr/local/bin/phpmd \
	&& chmod +x /usr/local/bin/phpmd
ENV XDEBUG_MODE=coverage
WORKDIR /app
