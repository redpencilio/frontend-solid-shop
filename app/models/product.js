import SemanticModel, {
  solid,
  string,
  hasMany,
} from 'ember-solid/models/semantic-model';

@solid({
  defaultStorageLocation: '/private/tests/my-products.ttl',
  private: true,
  type: 'http://purl.org/goodrelations/v1#ProductOrService',
  ns: 'http://purl.org/goodrelations/v1#',
})
export default class Product extends SemanticModel {
  @string()
  name;

  @string()
  description;

  @hasMany({
    model: 'offering',
    predicate: 'http://purl.org/goodrelations/v1#includes',
    inverse: true,
    inverseProperty: 'includes',
  })
  offerings; // gr:Offering
}
