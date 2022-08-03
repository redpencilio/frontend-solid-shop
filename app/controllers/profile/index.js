import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class ProfileIndexController extends Controller {
  @service solidAuth;

  @tracked success = null;

  @action
  async saveMollieKey(event) {
    event.preventDefault();

    document.getElementById('save-key-button').disabled = true;
    document.getElementById('save-key-button').innerHTML = 'Saving...';

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

    document.getElementById('save-key-button').disabled = false;
    document.getElementById('save-key-button').innerHTML = 'Save';
  }

  @action
  async loginCSS(event) {
    event.preventDefault();
    this.success = null;

    document.getElementById('login-css-button').disabled = true;
    document.getElementById('login-css-button').innerHTML = 'Logging in...';

    const response = await fetch(`${this.cssIDPURL}/idp/credentials/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.cssEmail,
        password: this.cssPassword,
        name: 'solid-shop',
      }),
    });

    const { id, secret } = await response.json();

    // Now, save the id, secret, IDP URL and IDP type (CSS) to the triple store.
    const body = {
      clientWebId: this.solidAuth.webId,
      clientId: id,
      clientSecret: secret,
      idpUrl: this.cssIDPURL,
      idpType: 'css',
    };
    const formBody = [];
    for (const property in body) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(body[property]);
      formBody.push(`${encodedKey}=${encodedValue}`);
    }
    await fetch(`/profile/credentials`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      body: formBody.join('&'),
    });

    document.getElementById('login-css-button').disabled = false;
    document.getElementById('login-css-button').innerHTML = 'Login';

    this.success = 'You have successfully authenticated with your CSS POD!';
  }
}
