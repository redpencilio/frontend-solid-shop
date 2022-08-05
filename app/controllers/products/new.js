import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import Controller from '@ember/controller';

export default class ProductsNewController extends Controller {
  @service router;
  @service store;
  @service solidAuth;

  @action
  async save(event) {
    event.preventDefault();

    // First, save the uploaded picture to the file-service.
    const formData = new FormData();
    formData.append('file', event.target.elements['picture'].files[0]);
    const response = await fetch('/files', {
      method: 'POST',
      body: formData,
    });
    const json = await response.json();
    const pictureUrl = json.links.self;

    const product = this.store.create('product', {
      name: this.name,
      description: this.description,
      image: pictureUrl,
    });

    // Immediately add a new offering for the product.
    const priceSpecification = this.store.create('price-specification', {
      hasCurrency: 'EUR',
      hasCurrencyValue: this.price,
    });
    const offering = this.store.create('offering', {
      name: this.name,
      description: this.description,
      includes: product,
      hasPriceSpecification: priceSpecification,
    });
    this.store.create('business-entity', {
      legalName: this.legalName,
      webId: this.solidAuth.webId,
      offers: offering,
    });

    await this.store.persist();

    // Go back to the overview of all products and clear form input.
    this.name = '';
    this.description = '';
    this.price = '';
    this.legalName = '';
    this.router.transitionTo('products.index');
  }
}
