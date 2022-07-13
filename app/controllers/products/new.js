import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import Controller from '@ember/controller';

export default class ProductsNewController extends Controller {
  @service router;
  @service store;

  @action
  save() {
    console.log('save', this.name, this.description);
    this.store.create('product', {
      name: this.name,
      description: this.description,
    });

    this.store.persist();
    this.router.refresh();
  }
}
