import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import Controller from '@ember/controller';

export default class ProductsEditController extends Controller {
  @service store;
  @service router;

  @action
  async save(event) {
    event.preventDefault();

    this.model.name = this.model.name.trim();
    this.model.description = this.model.description.trim();

    await this.store.persist();

    this.router.transitionTo('products.index');
  }

  @action
  async savePicture(event) {
    event.preventDefault();

    // First, save the uploaded picture to the file-service.
    const formData = new FormData();
    formData.append('file', event.target.elements['picture'].files[0]);
    const response = await fetch('/files', {
      method: 'POST',
      body: formData,
    });
    const json = await response.json();
    const pictureUrl = json.links.self;

    // Now, update the product with the new picture.
    this.model.image = pictureUrl;

    await this.store.persist();

    this.router.transitionTo('products.index');
  }
}
