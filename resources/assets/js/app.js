import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

if(document.getElementById('dashboard') != undefined)
{
    ReactDOM.render(<Dashboard/>, document.getElementById('dashboard'));
}
if(document.getElementById('login') != undefined)
{
    ReactDOM.render(<Login/>, document.getElementById('login'));
}
