import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default class IndexController extends Controller {
  queryParams = ['name', 'description', 'seller'];

  @service router;
  @service solidAuth;

  @action
  async buy(offeringId, sellerPod, event) {
    event.preventDefault();

    const body = {
      buyerPod: this.solidAuth.podBase,
      sellerPod: sellerPod,
      buyerWebId: this.solidAuth.webId,
      offeringId: offeringId,
    };
    const formBody = [];
    for (const property in body) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(body[property]);
      formBody.push(`${encodedKey}=${encodedValue}`);
    }
    await fetch(`/buy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      body: formBody.join('&'),
    });

    console.log(offeringId);
  }
}
