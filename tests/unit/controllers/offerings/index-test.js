import { module, test } from 'qunit';
import { setupTest } from 'frontend-solid-shop/tests/helpers';

module('Unit | Controller | offerings/index', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:offerings/index');
    assert.ok(controller);
  });
});
