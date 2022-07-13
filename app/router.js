import EmberRouter from '@ember/routing/router';
import config from 'app-solid-shop/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('login');
  this.route('profile');

  this.route('products', function () {
    this.route('new');
  });
});