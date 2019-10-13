import React, { Component } from 'react';
import {
   Typography, 
   TextField, 
   Button,
   Grid,
   InputAdornment,
} from '@material-ui/core';
import VersionInformation from './VersionInformation';
import SearchIcon from '@material-ui/icons/Search';


const styles = {
    button:{
        marginRight: 10,
        backgroundColor: "#94B8F7",
        color: 'black',
    },
}
class VersionTracking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data :
  {
	"versionDetails": [{
    "id": 1,
    "versionName": "Version 4.0",
    "status": "In Progress",
    "progress": "40",
    "startDate": "01/10/19",
    "releaseDate":"20/08/19",
    "description": "Awesome",
    "action": "....",
  },
  {
		"id": 2,
    "versionName": "Version 3.0",
    "status": "Un Release",
    "progress": "60",
    "startDate": "20/08/19",
    "releaseDate": "01/06/19",
    "description": "Website",
    "action": "....",
  },
  {
    "id": 3,
    "versionName": "Version 2.0",
    "status": "Un Release",
    "progress": "80",
    "startDate": "01/06/19",
    "releaseDate": "01/10/19",
    "description": "...",
    "action": "....",
  },
  {
    "id": 4,
    "versionName": "Version 1.8",
    "status": "Released",
    "progress": "100",
    "startDate": "01/01/17",
    "releaseDate": "01/06/17",
    "description": "Version 1.8",
    "action": "....",
  },
  {
    "id": 5,
    "versionName": "Version 1.5",
    "status": "Released",
    "progress": "100",
    "startDate": "01/06/18",
    "releaseDate": "05/9/18",
    "description": "Version 1.5",
    "action": "....",
  },
]
},
search: '',
filterStatus:'',
    };
  }

  onAddItem = () => {
    let { data: { versionDetails: items = [] } } = this.state;
    items = [
      ...items,
      {
        versionName: '',
        status: '',
        progress: '',
        startDate: '',
        releaseDate:'',
        description:'',
        action:'',
      },
    ];
    this.onChangeItem(items);
  }

  onSave = () => {
    const { data } = this.state;
   console.log('data', data);
  }


  onChangeItem = (items) => {
    const { data = {} } = this.state;
    this.setState({
      data: {
        ...data,
        versionDetails: items,
      },
    });
  }

  handleFormChanges = (event) => {
    const { data = {} } = this.state;
    const { name } = event.target;
    let { value } = event.target;
    this.setState({
      data: {
        ...data,
        [name]: value,
      },
    });
  }


  removeItem = (i) => {
    const { data: { versionDetails: items = [] } } = this.state;
    const newItems = items.filter(item => item.productId !== i.productId);
    this.onChangeItem(newItems);
  }

  onClick = (progress) => {
    const { data: { versionDetails: items = [] } } = this.state;
    let nameList = items.filter(n => {
    return n.status.indexOf(progress) >= 0
  })
    this.setState({
      filterStatus: nameList,
    })
  }

  handleButton = (ButtonType) => {
    if (ButtonType === 'In Progress') {
      this.onClick('In Progress');
    } else if (ButtonType === 'Un Release') {
      this.onClick('Un Release');
    } else if (ButtonType === 'Released') {
      this.onClick('Released');
    } 
    }
  

onSearch = (event) => {
  this.setState({ search: event.target.value });
};


render() {
  const { data: { versionDetails = [] }, search, filterStatus } = this.state;

  return (
    <div>
      <div style={{ width: '78%', margin: '10px auto' }}>
        <Grid container spacing={32} style={{boxShadow: '3px 3px 3px #D3D3D3',
                 border: '1px solid #D3D3D3'}}>
            <Grid item xs={12} md={8} style={{marginBottom: 10}}>
                <Grid container spacing={16}>
                    <Grid item xs={12} md={12}>
                        <h5>Projects / ENV 1.5</h5> 
                        <Typography variant="body2" color="primary">
                          <h3>Releases</h3>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <Button
                        style={styles.button}
                        onClick={() => this.handleButton('In Progress')}
                        color="secondary"
                        variant="contained"
                      >In Progress
                      </Button>
                      <Button
                       
                        style={styles.button}
                        onClick={() => this.handleButton('Un Release')}
                        color="secondary"
                        variant="contained"
                      >Un Release
                      </Button>
                      <Button
                        style={styles.button}
                        onClick={() => this.handleButton('Released')}
                        color="secondary"
                        variant="contained"
                      >Released
                      </Button>
                    </Grid>
                    <Grid item xs={12} md={4}>
                          <TextField
                            label="Search By Version"
                            name="search"
                            value={search}
                            margin='dense'
                            onChange={this.onSearch}
                            style={styles.search}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="start">
                                  <SearchIcon />
                                </InputAdornment>
                               )
                              }}
                          />
                          
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        <Grid item xs={12} md={12} style={{marginTop: 30, marginBottom: 30}}>
                <VersionInformation
                  items={versionDetails}
                  removeItem={this.removeItem}
                  onChange={this.onChangeItem}
                  filterText={search}
                  filterStatus={filterStatus}
                />
         </Grid>
        <Grid item xs={12} md={12}>
            <Button variant="contained" color="primary" onClick={this.onAddItem}>
                    + Add
            </Button>
            <Button variant="contained"  color="primary" onClick={this.onSave} style={{float: 'right'}}>
                    Save
            </Button>
         </Grid>
        </div>
    </div>
  );
}
}


export default (VersionTracking);