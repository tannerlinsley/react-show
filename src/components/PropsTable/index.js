import React from 'react';
import PropTypes from 'prop-types';
import { propTypesToObject } from '../../utils'
import { parse } from 'react-docgen'

const getRows = propTypes => Object.keys(propTypes).map(prop => (
  <tr key={prop}>
    <td>{prop}</td>
    <td>
      {propTypes[prop].type.name}
      {propTypes[prop].type.value && propTypes[prop].type.value.map(v => v.value)}
    </td>
    <td>{propTypes[prop].required.toString()}</td>
    <td>{propTypes[prop].defaultValue.value}</td>
    <td>{propTypes[prop].description}</td>
  </tr>
));

const Table = ({ demonstrating, raw }) => {

  console.log(parse(raw))

  let propTypes = parse(raw).props

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Required?</th>
          <th>Default</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {getRows(propTypes)}
      </tbody>
    </table>
  );
}

Table.propTypes = {
  demonstrating: PropTypes.func.isRequired,
  raw: PropTypes.string.isRequired
}

export default Table;
