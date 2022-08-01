import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import Controller from '@ember/controller';

export default class ProductsEditController extends Controller {
  @service store;
  @service router;

  @action
  async save(event) {
    event.preventDefault();

    this.model.name = this.model.name.trim();
    this.model.description = this.model.description.trim();

    await this.store.persist();

    this.router.transitionTo('products.index');
  }
}
