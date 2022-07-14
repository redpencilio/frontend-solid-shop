import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import Controller from '@ember/controller';

export default class ProductsNewController extends Controller {
  @service router;
  @service store;

  @action
  async save(event) {
    event.preventDefault();

    const product = this.store.create('product', {
      name: this.name,
      description: this.description,
    });

    // Immediately add a new offering for the product.
    const priceSpecification = this.store.create('price-specification', {
      hasCurrency: '€',
      hasCurrencyValue: this.price,
    });
    this.store.create('offering', {
      name: this.name,
      description: this.description,
      includes: product,
      hasPriceSpecification: priceSpecification,
    });

    await this.store.persist();

    // Go back to the overview of all products and clear form input.
    this.name = '';
    this.description = '';
    this.price = '';
    this.router.transitionTo('products.index');
  }
}
