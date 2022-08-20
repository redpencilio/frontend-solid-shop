import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default class ProductsNewRoute extends Route {
  @service solidAuth;
  @service store;

  async model() {
    await this.solidAuth.ensureLogin();
    await this.store.fetchGraphForType('offering');
    return [];
  }
}
