FROM php:apache

RUN apt-get update -y && apt-get install -y sendmail libpng-dev libfreetype6-dev libjpeg62-turbo-dev libgd-dev libpng-dev

RUN docker-php-ext-install pdo pdo_mysql 

RUN docker-php-ext-configure gd \ 
    --with-freetype=/usr/include/ \ 
    --with-jpeg=/usr/include/

RUN docker-php-ext-install gd

RUN mv "$PHP_INI_DIR/php.ini-development" "$PHP_INI_DIR/php.ini"
COPY ./www /var/www
