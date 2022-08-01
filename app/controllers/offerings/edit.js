import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import Controller from '@ember/controller';

export default class OfferingsEditController extends Controller {
  @service store;
  @service router;

  @action
  async save(event) {
    event.preventDefault();

    this.model.offering.name = this.model.offering.name.trim();
    this.model.offering.description = this.model.offering.description.trim();
    this.model.offering.hasPriceSpecification.hasCurrencyValue = parseFloat(
      this.model.offering.hasPriceSpecification.hasCurrencyValue
    );
    this.model.offering.seller.legalName =
      this.model.offering.seller.legalName.trim();
    const productValue = event.target.elements['product'].value;
    this.model.offering.includes = this.store.peekInstance(
      'product',
      productValue.substring(1, productValue.length - 1)
    );
    await this.store.persist();

    this.router.transitionTo('offerings.index');
  }
}
