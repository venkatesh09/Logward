import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  Button,
  TableBody,
  TableCell,
  TableRow,
  TextField,
} from '@material-ui/core';
import TableHeader from './TableHeader';
import LinearProgress from '@material-ui/core/LinearProgress';


const columnData = [

  {
    id: 'versionName', numeric: false, disablePadding: true, label: 'Version',
  },
  {
    id: 'status', numeric: false, disablePadding: true, label: 'Status',
  },
  {
    id: 'progress', numeric: false, disablePadding: true, label: 'Progress',
  },
  {
    id: 'startDate', numeric: false, disablePadding: true, label: 'Start Date',
  },
  {
    id: 'releaseDate', numeric: false, disablePadding: true, label: 'Release Date',
  },
  {
    id: 'description', numeric: false, disablePadding: true, label: 'Description',
  },
  {
    id: 'action', numeric: false, disablePadding: true, label: 'Actions',
  },
];



const styles = {
    div: {
      display: 'flex',
      flexDirection: 'row wrap',
      width: '100%',
      background: '#f9f9f9',
      marginBottom: 20,
    },
    paperLeft: {
      flex: 8,
      textAlign: 'center',
      padding: 5,
      backgroundColor: '#fff',
      overflow: 'scroll',
      width: '100%',
      boxShadow: '3px 3px 3px #D3D3D3',
      border: '1px solid #D3D3D3',
    },
    tableCell: {
      textAlign: 'center',
      float:'left',
    },
      bar: {
        borderRadius: 40,
        backgroundColor: '#ff6c5c',
        height: 30,
      },
      progress: {
        margin: 5,
        height: 20,
        width: 80,
        backgroundColor: '#0E2E89',
        borderRadius: '20px',
       },
  };
  

class VersionInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { items = [] } = nextProps;
    return {
      data: items,
    };
  }

  handleChange = (event, index) => {
    const { name, value } = event.target;
    const { onChange } = this.props;
    const { data: modfiedItems } = this.state;
    modfiedItems[index][name] = value;
    this.setState({ data: modfiedItems });
    onChange(modfiedItems);
  }

  removeItem = (index) => {
    const { onChange } = this.props;
    const { data: modItems } = this.state;
    modItems.splice(index, 1);
    this.setState({ data: modItems });
    onChange(modItems);
  }

  render() {
    const { data = [] } = this.state ;
    const { filterText, filterStatus } = this.props;

    let versionNameList = data.filter(name => {
      return name.versionName.toLowerCase().indexOf(filterText.toLowerCase()) >= 0
    })

    if(filterStatus){
      versionNameList = filterStatus.filter(n => {
        return n.versionName.indexOf(filterText) >= 0
      })
    }

    versionNameList = versionNameList.map((n, index) => {
      return (
        <TableRow 
          hover
          role="checkbox"
          tabIndex={-1}
          key={n.id}
        >
        <TableCell style={{ color: '#f50057' }} component="th" scope="row" padding="none">
                      <TextField
                            name="versionName"
                            placeholder="Version Name"
                            margin="dense"
                            style={styles.dense}
                            variant="outlined"
                            value={n.versionName}
                            onChange={e => this.handleChange(e, index)}
                        />
                    </TableCell>
                    <TableCell style={{ color: '#f50057' }} component="th" scope="row" padding="none">
                        <TextField
                            name="status"
                            placeholder="Status"
                            type="text"
                            margin="dense"
                            style={styles.dense}
                            variant="outlined"
                            value= {n.status}
                            onChange={e => this.handleChange(e, index)}
                        />
                    </TableCell>
                    <TableCell component="th" scope="row" padding="none">
                          <LinearProgress
                            variant="determinate"
                            color="secondary"
                            value={n.progress || ''}
                            style={styles.progress}
                          />
                    </TableCell>
                    <TableCell component="th" scope="row" padding="none">
                    <TextField
                            name="startDate"
                            margin="dense"
                            style={styles.dense}
                            placeholder="Start Date"
                            variant="outlined"
                            value= {n.startDate}
                            onChange={e => this.handleChange(e, index)}
                        />
                    </TableCell>
                    <TableCell component="th" scope="row" padding="none">
                    <TextField
                            name="releaseDate"
                            margin="dense"
                            style={styles.dense}
                            placeholder="Release Date"
                            variant="outlined"
                            value= {n.releaseDate}
                            onChange={e => this.handleChange(e, index)}
                        />
                    </TableCell>
                    <TableCell component="th" scope="row" padding="none">
                        <TextField
                          name="Description"
                          margin="dense"
                          style={styles.dense}
                          placeholder="Description"
                          variant="outlined"
                          value= {n.description}
                          onChange={e => this.handleChange(e, index)}
                        />
                    </TableCell>
                    <TableCell component="th" scope="row" padding="none">
                      <Button color="secondary" variant="contained" onClick={() => this.removeItem(index)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                  );
                })
                  return (
                <div style={styles.div}>
                  <div style={styles.paperLeft}>
                  
                    <Table aria-labelledby="tableTitle">
                      <TableHeader columns={columnData} />
                      <TableBody>
                          {versionNameList}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              );
            }
          }

VersionInformation.propTypes = {
  items: PropTypes.instanceOf(Array),
  onChange: PropTypes.func,
};


export default VersionInformation;
