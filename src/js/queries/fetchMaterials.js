import gql from 'graphql-tag';

export default gql`
query getMaterials {
  materialsCostingFeed{
    id
    materialName
    materialDescription
    units
    costPerUnit
    standardUnit
    balance{
      id
      balance
    }
  }
}
`;