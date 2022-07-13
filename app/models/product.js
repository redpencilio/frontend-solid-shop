import SemanticModel, {
  solid,
  string,
} from 'ember-solid/models/semantic-model';
import { rdfType } from 'ember-solid/models/semantic-model';

@solid({
  defaultStorageLocation: '/private/tests/my-products.ttl', // default location in solid pod
  private: true, // is this private info for the user?
  rdfType: 'ProductOrService', // smessie: did rdfType here instead of type
  ns: 'http://purl.org/goodrelations/',
})
@rdfType('http://purl.org/goodrelations/ProductOrService') // smessie: tried to add this here
export default class Product extends SemanticModel {
  @string
  name;

  @string
  description;
}
