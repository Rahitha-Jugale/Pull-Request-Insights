import './App.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { Box, Grid, Link } from '@material-ui/core';
import { useState } from 'react';
import ByBranch from './component/ByBranch';
import ByAuthor from './component/ByAuthor';
import ByLOC from './component/ByLOC';

function App() {

  const initialSelectOptions = {
    byBranch: false,
    byAuthor: false,
    byLOC: false
  }

  const [selectOptions, setSelectOptions] = useState(initialSelectOptions);

  const handleClick = (event) => {
    var option = null;
    if(event.target.innerText === "By Branch"){
      option = "byBranch";
      setSelectOptions({...initialSelectOptions, [option]:true});
    }else if(event.target.innerText === "By Author"){
      option = "byAuthor";
      setSelectOptions({...initialSelectOptions, [option]:true});
    }else{
      option = "byLOC";
      setSelectOptions({...initialSelectOptions, [option]:true});
    }
  }

  return (
    <Box>
      <Grid container spacing={0} alignItems="center" className='title-bar'>
        <Grid item xs={1} md={1} lg={1}>
          <img src='../images/logoCropped.jpg' alt='logo'></img>
        </Grid>
        <Grid item xs={11} md={11} lg={11}>
          <h3 className='title-heading'>Pull Request Insights</h3>
        </Grid>
      </Grid>
      <Grid container spacing={0}>
        <Grid item xs={12} md={2} lg={3} className='nav-bar-container'>
          <List component="nav" aria-label="mailbox folders" className='nav-bar-list'>
            <Link underline='none' id="byBranch" onClick={handleClick}>
              <ListItem button>
                {selectOptions.byBranch? (<ListItemText primary="By Branch" className='nav-bar-items-onClick' />):
                <ListItemText primary="By Branch" className='nav-bar-items' />}
              </ListItem>
            </Link>
            <Divider />
            <Link underline='none' onClick={handleClick}>
              <ListItem button divider>
                {selectOptions.byAuthor? (<ListItemText primary="By Author" className='nav-bar-items-onClick' />):
                (<ListItemText primary="By Author" className='nav-bar-items' />)}
              </ListItem>
            </Link>
            <Link underline='none' onClick={handleClick}>
              <ListItem button>
                {selectOptions.byLOC ? (<ListItemText primary="Total Lines Added/Removed" className='nav-bar-items-onClick' />):
                (<ListItemText primary="Total Lines Added/Removed" className='nav-bar-items' />)}
              </ListItem>
            </Link>
          </List>
        </Grid>
        <Grid item xs={12} md={10} lg={9}>
          {/* {login? <Login authenticate={authenticate}/> : null} */}
          {selectOptions.byBranch? <ByBranch /> : null}
          {selectOptions.byAuthor? <ByAuthor /> : null}
          {selectOptions.byLOC? <ByLOC /> : null}
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
