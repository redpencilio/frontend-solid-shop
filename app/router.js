import EmberRouter from '@ember/routing/router';
import config from 'frontend-solid-shop/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('login');
  this.route('profile', function () {});

  this.route('products', function () {
    this.route('new');
  });

  this.route('offerings', function () {
    this.route('new');
  });
  this.route('sales', function () {});
  this.route('purchases', function () {});

  this.route('checkout', function () {
    this.route('success');
  });
});
