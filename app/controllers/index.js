import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default class IndexController extends Controller {
  queryParams = ['name', 'description', 'seller'];

  @service router;
  @service solidAuth;

  @action
  buy(offeringId, sellerPod, event) {
    event.preventDefault();

    const body = {
      buyerPod: this.solidAuth.podBase,
      sellerPod: sellerPod,
      buyerWebId: this.solidAuth.webId,
      offeringId: offeringId,
    };
    const formBody = [];
    for (const property in body) {
      const encodedKey = property;
      const encodedValue = body[property];
      formBody.push(`${encodedKey}" value="${encodedValue}`);
    }
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = '/buy';
    form.innerHTML = `<input type="hidden" name="${formBody.join(
      '" /> <input type="hidden" name="'
    )}" />`;
    document.body.appendChild(form);
    form.submit();
  }
}
