import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class IndexController extends Controller {
  queryParams = ['query', 'priceMin', 'priceMax'];

  @tracked priceMin = 0;
  @tracked priceMax = 3000;
  @tracked error = null;

  @service router;
  @service solidAuth;

  @action
  async buy(offeringId, sellerPod, event) {
    event.preventDefault();
    this.error = null;
    event.target.disabled = true;
    event.target.innerHTML = 'Buying...';

    // Send order details to search service
    const body = {
      buyerPod: await this.solidAuth.podBase,
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
    const result = await fetch(`/buy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      body: formBody.join('&'),
    });

    // Check if status is successful.
    if (!result.ok) {
      this.error = 'Your order could not be processed. Please try again later.';
      event.target.disabled = false;
      event.target.innerHTML = 'Buy!';
      return;
    }

    // Get as result from the search service the order ID to be paid.
    const json = await result.json();
    const orderId = json.orderUUID;

    // Redirect to the payment page by sending request to the payment service.
    const paymentBody = {
      orderId: orderId,
    };
    const paymentFormBody = [];
    for (const property in paymentBody) {
      const encodedKey = property;
      const encodedValue = paymentBody[property];
      paymentFormBody.push(`${encodedKey}" value="${encodedValue}`);
    }
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = '/payments';
    form.innerHTML = `<input type="hidden" name="${paymentFormBody.join(
      '" /> <input type="hidden" name="'
    )}" />`;
    document.body.appendChild(form);
    form.submit();
  }

  @action
  updatedMin() {
    if (this.priceMin > this.priceMax) {
      this.priceMin = this.priceMax;
    }
  }

  @action
  updatedMax() {
    if (this.priceMax < this.priceMin) {
      this.priceMax = this.priceMin;
    }
  }
}
