import { module, test } from 'qunit';
import { setupTest } from 'app-solid-shop/tests/helpers';

module('Unit | Controller | products/new', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:products/new');
    assert.ok(controller);
  });
});
