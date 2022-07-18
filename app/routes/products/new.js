import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default class ProductsNewRoute extends Route {
  @service solidAuth;

  async model() {
    await this.solidAuth.ensureLogin();
    return [];
  }
}
