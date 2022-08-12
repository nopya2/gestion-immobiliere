Api Backend Application de gestion des inscriptions
===============================================

Requirements
------------

  * Symfony 5.4
  * PHP 8.1 or higher;
  * and the [usual Symfony application requirements][2].
  * Composer 2

Installation
------------
Create a MySql database `groupe_education`
```bash
$ git clone https://github.com/nopya2/groupe-education.git
$ cd groupe-education/
$ cd backend/
$ composer install
$ php bin/console doctrine:migrations:migrate
```

[Download Symfony][4] to install the `symfony` binary on your computer

Usage
-----

There's no need to configure anything to run the application. If you have
[installed Symfony][4] binary, run this command:

```bash
$ cd groupe-education/
$ cd backend/
$ symfony serve
```

Then access the application in your browser at the given URL (<https://localhost:8000> by default).

If you don't have the Symfony binary installed, run `php -S localhost:8000 -t public/`
to use the built-in PHP web server or [configure a web server][3] like Nginx or
Apache to run the application.

# Génération des clés privé et public

créer le répertoire `config/jwt`
ensuite exécutez les commandes suivantes:

```bash
$ openssl genrsa -out config/jwt/private.pem -aes256 4096
$ openssl rsa -pubout -in config/jwt/private.pem -out config/jwt/public.pem
```
