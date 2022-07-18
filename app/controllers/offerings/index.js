import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import Controller from '@ember/controller';

export default class OfferingsIndexController extends Controller {
  @service solidAuth;

  @action
  async sync(event) {
    event.preventDefault();

    document.getElementById('sync-button').disabled = true;
    document.getElementById('sync-button').innerHTML = 'Syncing...';

    const body = { pod: this.solidAuth.podBase };
    const formBody = [];
    for (const property in body) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(body[property]);
      formBody.push(`${encodedKey}=${encodedValue}`);
    }
    await fetch(`/sync`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      body: formBody.join('&'),
    });

    document.getElementById('sync-button').disabled = false;
    document.getElementById('sync-button').innerHTML = 'Sync your offerings';
  }
}
