import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { universalAccess } from '@inrupt/solid-client';

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
    await fetch(`/key`, {
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
    await fetch(`/auth/credentials`, {
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

  @action
  async loginESS(event) {
    event.preventDefault();
    this.success = null;

    document.getElementById('login-ess-button').disabled = true;
    document.getElementById('login-ess-button').innerHTML = 'Logging in...';

    // Get ESS WebID from backend.
    const response = await fetch(`/auth/ess/webId`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { webId } = await response.json();
    const podBase = await this.solidAuth.podBase;

    const productsAccess = universalAccess.setAgentAccess(
      `${podBase}private/tests/my-products.ttl`,
      webId,
      { read: true, write: true },
      { fetch: this.solidAuth.session.fetch }
    );
    const offeringsAccess = universalAccess.setAgentAccess(
      `${podBase}private/tests/my-offerings.ttl`,
      webId,
      { read: true, write: true },
      { fetch: this.solidAuth.session.fetch }
    );
    await Promise.all([productsAccess, offeringsAccess]);

    // Now, save the IDP type (ESS) to the triple store.
    const body = {
      clientWebId: this.solidAuth.webId,
      idpType: 'ess',
    };
    const formBody = [];
    for (const property in body) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(body[property]);
      formBody.push(`${encodedKey}=${encodedValue}`);
    }
    await fetch(`/auth/credentials`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      body: formBody.join('&'),
    });

    document.getElementById('login-ess-button').disabled = false;
    document.getElementById('login-ess-button').innerHTML = 'Login';

    this.success = 'You have successfully authenticated with your ESS POD!';
  }
}
