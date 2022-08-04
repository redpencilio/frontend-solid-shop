import SemanticModel, {
  solid,
  string,
  float,
  belongsTo,
} from 'ember-solid/models/semantic-model';

@solid({
  defaultStorageLocation: 'private/tests/my-offerings.ttl',
  private: true,
  type: 'http://purl.org/goodrelations/v1#PriceSpecification',
  ns: 'http://purl.org/goodrelations/v1#',
})
export default class PriceSpecification extends SemanticModel {
  @string()
  hasCurrency;

  @float()
  hasCurrencyValue;

  @belongsTo({
    model: 'offering',
    predicate: 'http://purl.org/goodrelations/v1#hasPriceSpecification',
    inverse: true,
    inverseProperty: 'hasPriceSpecification',
  })
  offering; // gr:Offering
}
