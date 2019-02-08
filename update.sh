#!/bin/bash
git pull
composer install
yarn run prod
echo -e "\e[7mStrongr Updated Successfully! \n"