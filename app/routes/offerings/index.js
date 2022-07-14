import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default class OfferingsIndexRoute extends Route {
  @service solidAuth;
  @service store;

  async model() {
    await this.solidAuth.ensureLogin();
    await this.store.fetchGraphForType('offering');
    return this.store.all('offering');
  }
}
