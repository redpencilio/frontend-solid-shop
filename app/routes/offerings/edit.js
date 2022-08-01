import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default class OfferingsEditRoute extends Route {
  @service solidAuth;
  @service store;

  async model({ id }) {
    await this.solidAuth.ensureLogin();
    await this.store.fetchGraphForType('offering');
    const offering = this.store.peekInstance('offering', id);

    await this.store.fetchGraphForType('product');
    const products = this.store.all('product');
    return { offering, products };
  }
}
