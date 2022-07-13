import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import Controller from '@ember/controller';

export default class ProductsNewController extends Controller {
  @service router;
  @service store;

  @action
  async save(event) {
    event.preventDefault();

    this.store.create('product', {
      name: this.name,
      description: this.description,
    });

    await this.store.persist();

    // Go back to the overview of all products and clear form input.
    this.name = '';
    this.description = '';
    this.router.transitionTo('products.index');
  }
}
