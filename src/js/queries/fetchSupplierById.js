import gql from 'graphql-tag'

export default gql`
query getSupplierById($id:ID!){
  getSupplier(id:$id){
     id
   negotiatedRate,
    otherDetails,
    supplierName,
    supplierPhone,
    material{
            id
            materialName
            costPerUnit
    }
  }
}
`;