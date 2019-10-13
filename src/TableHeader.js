import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TableHead, TableRow, TableCell} from '@material-ui/core/';

class TableHeader extends Component {
    createSortHandler = property => (event) => {
      const { onRequestSort } = this.props;
      onRequestSort(event, property);
    };

    render() {
      const {
        order,
        orderBy,
        columns = [],
        cellStyle = {},
      } = this.props;

      return (
        <TableHead>
          <TableRow>
            {columns.map(column => (
              <TableCell
                style={{ ...cellStyle, ...column.style }}
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === column.id ? order : false}
              >
                {column.label}
              </TableCell>
              ))}
          </TableRow>
        </TableHead>
      );
    }
}

TableHeader.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string,
  columns: PropTypes.instanceOf(Array),
  onRequestSort: PropTypes.func,
  cellStyle: PropTypes.instanceOf(Object),
};

export default TableHeader;
