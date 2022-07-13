import { module, test } from 'qunit';
import { setupTest } from 'app-solid-shop/tests/helpers';

module('Unit | Route | products/new', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:products/new');
    assert.ok(route);
  });
});
