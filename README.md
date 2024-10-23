##  Requirements for installing this base project 
laravel : 7.x
php : >= 7.4
postgres: >= 9.3

# Steps for Setting up a new laravel ,Jquery Base project using this package . 

### clone the project 
```python
git clone https://github.com/sajaras/laravel7_erp_starter_kit.git
```
### installing dependencies
```python
cd laravel7_erp_starter_kit
composer install
```
### Setting Database
create new postgres database
`cp .env.example .env`
change database credentials and run the following

```python
php artisan config:cache
php artisan migrate
php artisan passport:install
```
###  Setting client id  
copy the client id of password grant client recieved after running hp artisan passport:install
update client id and client secret in file login.blade.php
reference :  
appenddata.client_id = "<client_id>";
 appenddata.client_secret = "<client_secret>";

 ###  Setting new git  for the project 

 sudo rm -r .git <br />
git init





