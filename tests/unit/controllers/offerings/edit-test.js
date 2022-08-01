import { module, test } from 'qunit';
import { setupTest } from 'frontend-solid-shop/tests/helpers';

module('Unit | Controller | offerings/edit', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:offerings/edit');
    assert.ok(controller);
  });
});
