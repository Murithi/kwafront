import React from 'react';
import { Table } from 'semantic-ui-react';

const VehicleItem = props => {
  return (
    <Table.Row>
      <Table.Cell>{props.registrationNumber}</Table.Cell>
      <Table.Cell>{props.logBookNumber}</Table.Cell>
      <Table.Cell>{props.model}</Table.Cell>
      <Table.Cell>{props.fuelType}</Table.Cell>
      <Table.Cell>{props.insuranceValuation}</Table.Cell>
      <Table.Cell>{props.insuranceRenewalDate}</Table.Cell>
      <Table.Cell>{props.age}</Table.Cell>
      <Table.Cell>{props.owner}</Table.Cell>
      <Table.Cell textAlign="right">Edit|Delete</Table.Cell>
    </Table.Row>
  );
};

export default VehicleItem;
