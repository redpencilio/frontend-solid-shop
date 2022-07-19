import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default class IndexController extends Controller {
  queryParams = ['name', 'description', 'seller'];

  @service router;

  @action
  search(event) {
    event.preventDefault();

    const name = this.name;
    const description = this.description;
    const seller = this.seller;
    this.router.transitionTo({ queryParams: { name, description, seller } });
  }
}
