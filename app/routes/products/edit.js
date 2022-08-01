import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default class ProductsEditRoute extends Route {
  @service solidAuth;
  @service store;

  async model({ id }) {
    await this.solidAuth.ensureLogin();
    await this.store.fetchGraphForType('product');
    return this.store.peekInstance('product', id);
  }
}
