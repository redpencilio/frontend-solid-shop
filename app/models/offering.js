import SemanticModel, {
  solid,
  string,
  belongsTo,
} from 'ember-solid/models/semantic-model';

@solid({
  defaultStorageLocation: '/private/tests/my-offerings.ttl',
  private: true,
  type: 'http://purl.org/goodrelations/v1#Offering',
  ns: 'http://purl.org/goodrelations/v1#',
})
export default class Offering extends SemanticModel {
  @string()
  name;

  @string()
  description;

  @belongsTo({
    model: 'product',
    predicate: 'http://purl.org/goodrelations/v1#includes',
    inverse: false,
    inverseProperty: 'offerings',
  })
  includes; // gr:ProductOrService

  @belongsTo({
    model: 'price-specification',
    predicate: 'http://purl.org/goodrelations/v1#hasPriceSpecification',
    inverse: false,
    inverseProperty: 'offering',
  })
  hasPriceSpecification; // gr:PriceSpecification

  @belongsTo({
    model: 'quantitative-value-float',
    predicate: 'http://purl.org/goodrelations/v1#hasInventoryLevel',
    inverse: false,
    inverseProperty: 'offering',
  })
  hasInventoryLevel; // gr:QuantitativeValueFloat
}
