import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  queryParams = {
    query: {
      refreshModel: true,
    },
    priceMin: {
      refreshModel: true,
    },
    priceMax: {
      refreshModel: true,
    },
  };

  @service solidAuth;

  async model({ query, priceMin, priceMax }) {
    await this.solidAuth.ensureLogin();

    const result = await fetch(
      `/search/offerings/search?filter[:gte,lte:price.price]=${priceMin},${priceMax}${
        query ? `&filter[:fuzzy:_all]=${encodeURIComponent(query)}` : ''
      }`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const json = await result.json();
    return json.data;
  }
}
