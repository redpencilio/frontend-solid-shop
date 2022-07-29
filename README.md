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

## Payments flow

Below, the payments flow and communication between the frontend and the different services is specified.
- **frontend -> search**
  - initiate order, send back `orderId`
- **frontend -> payment**
  - *location rewrite: user goes to payment service*
  - send `orderId`, initiate payment, save payment info to triple store
- **payment -> mollie**
  - *location rewrite: user goes to Mollie checkout page to pay*
  - handle payment
- **mollie -> frontend**
  - *location rewrite: user goes back to application frontend*
  - go to redirect url
- **mollie -> payment**
  - call callback url (sends `orderId`), update payment info in triple store (add `paymentId`, update `orderStatus`) by querying Mollie API
- **payment -> search**
  - query triple store and accordingly update seller & buyer PODs

### Mollie API Key

You can specify the application's Mollie API key via the `MOLLIE_API_KEY` environment variable in the `docker-compose.yml` file.  
It will use this API key to handle payments if there is no Mollie API key specified for the seller in the triple store.  
However, specifying a Mollie API key for the seller in the triple store (`?sellerWebId ext:mollieApiKey ?mollieApiKey`) will override the default API key, letting the buyer directly pay to the seller.

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://cli.emberjs.com/release/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
