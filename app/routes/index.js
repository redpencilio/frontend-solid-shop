import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  async model() {
    const result = await fetch('/query', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await result.json();
    return json.results.bindings;
  }
}
