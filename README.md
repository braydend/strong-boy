# Strong Boy

Strong boy is an exercise tracker to aid in monitoring and logging progression of workouts (mainly weight lifting). It is a web app that has partial mobile support

# Features
- User Accounts
- Global exercise creation. Users can create exercises that other users of the app can see/use.
- Sets can be created from the dashboard and are graphed.
- Sets can be flagged as warmup sets; This will ensure they are not graphed or displayed on the dashboard.
- Sets can be logged in lb or kg. Weights will be displayed in kg.

# Development
## Setup
Install <a href="https://laravel.com/docs/5.7/homestead">Laravel Homestead</a> as your development environment. This will ensure you dont wreck anything crucial on your system.

## Stack
PHP backend running Laravel

ReactJS front end

MySQL RDB

# Deployment
The current version of strongboy production can be used <a href="http://54.153.211.3">here</a>
## Updates
Any updates that you wish to deploy must be on master, deploys are handled via running the following commands on the production server:
- `git pull`
- `composer install`
- `php artisan migrate`
- `yarn run prod`
