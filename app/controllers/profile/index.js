import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import Controller from '@ember/controller';

export default class ProfileIndexController extends Controller {
  @service solidAuth;

  @action
  async save(event) {
    event.preventDefault();

    document.getElementById('save-button').disabled = true;
    document.getElementById('save-button').innerHTML = 'Saving...';

    const body = {
      apiKey: this.mollieApiKey,
      sellerWebId: this.solidAuth.webId,
    };
    const formBody = [];
    for (const property in body) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(body[property]);
      formBody.push(`${encodedKey}=${encodedValue}`);
    }
    await fetch(`/buy/key`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      body: formBody.join('&'),
    });

    document.getElementById('save-button').disabled = false;
    document.getElementById('save-button').innerHTML = 'Save';
  }
}
