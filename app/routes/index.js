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
      `/query?name=${name || ''}&description=${description || ''}&seller=${
        seller || ''
      }`,
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
