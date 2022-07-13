import SemanticModel, {
  solid,
  string,
} from 'ember-solid/models/semantic-model';

@solid({
  defaultStorageLocation: '/private/tests/my-products.ttl', // default location in solid pod
  private: true, // is this private info for the user?
  type: 'http://purl.org/goodrelations/ProductOrService', // smessie: did rdfType here instead of type
  ns: 'http://purl.org/goodrelations/',
})
export default class Product extends SemanticModel {
  @string()
  name;

  @string()
  description;
}
