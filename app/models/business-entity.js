import SemanticModel, {
  solid,
  string,
  belongsTo,
} from 'ember-solid/models/semantic-model';

@solid({
  defaultStorageLocation: 'private/tests/my-offerings.ttl',
  private: true,
  type: 'http://purl.org/goodrelations/v1#BusinessEntity',
  ns: 'http://purl.org/goodrelations/v1#',
})
export default class BusinessEntity extends SemanticModel {
  @string()
  legalName;

  @string({ predicate: 'http://purl.org/goodrelations/v1#description' })
  webId;

  @belongsTo({
    model: 'offering',
    predicate: 'http://purl.org/goodrelations/v1#offers',
    inverse: false,
    inverseProperty: 'seller',
  })
  offers; // gr:Offering
}
