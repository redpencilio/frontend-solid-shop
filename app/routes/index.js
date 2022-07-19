import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  queryParams = {
    name: {
      refreshModel: true,
    },
    description: {
      refreshModel: true,
    },
    seller: {
      refreshModel: true,
    },
  };

  async model({ name, description, seller }) {
    const result = await fetch(
      `/query?name=${encodeURIComponent(
        name || ''
      )}&description=${encodeURIComponent(
        description || ''
      )}&seller=${encodeURIComponent(seller || '')}`,
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
