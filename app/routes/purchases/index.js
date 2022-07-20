import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default class PurchasesIndexRoute extends Route {
  @service solidAuth;

  async model() {
    await this.solidAuth.ensureLogin();

    const result = await fetch(
      `/purchases?buyerWebId=${encodeURIComponent(this.solidAuth.webId)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const json = await result.json();
    return json.results.bindings;
  }
}
