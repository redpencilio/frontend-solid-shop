# frontend-solid-shop

The Solid Shop is a user-powered shopping ecosystem by use of SOLID PODs.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://cli.emberjs.com/release/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone git@github.com:redpencilio/frontend-solid-shop.git` this repository
* `cd frontend-solid-shop`
* `npm install`

## Running / Development

* `ember serve --proxy http://127.0.0.1:8080` (`8080` being the port of mu-identifier)
* Extra steps related to the payment service provider Mollie
  * [Install ngrok](https://ngrok.com/download)
  * `ngrok http 4200` to start ngrok so Mollie can reach your dev setup
  * Change the `MOLLIE_REDIRECT_URL` and `MOLLIE_BASE_WEBHOOK_URL` in the `docker-compose.yml` to match the ngrok urls
  * Sign up at [Mollie](https://www.mollie.com/) and get your [API key](https://docs.mollie.com/overview/authentication)
  * (At the end, fill in your API key via the profile page)
* `docker-compose up -d` to start the related services
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Linting

* `npm run lint`
* `npm run lint:fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://cli.emberjs.com/release/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
