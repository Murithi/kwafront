import gql from 'graphql-tag';

export default gql`
query getMaterialCosting($id:ID!){
  materialsCosting(id:$id){
    id
    materialName
    materialName
    standardUnit
    units
    costPerUnit
  }
}
`;