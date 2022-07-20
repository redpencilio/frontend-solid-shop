import { module, test } from 'qunit';
import { setupRenderingTest } from 'frontend-solid-shop/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | nav-bar', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<NavBar />`);

    assert
      .dom(this.element)
      .hasText(
        'The Solid Shop Home Your products Your offerings Your sales Profile'
      );

    // Template block usage:
    await render(hbs`
      <NavBar>
        The Solid Shop Home Your products Your offerings Your sales Profile
      </NavBar>
    `);

    assert
      .dom(this.element)
      .hasText(
        'The Solid Shop Home Your products Your offerings Your sales Profile'
      );
  });
});
