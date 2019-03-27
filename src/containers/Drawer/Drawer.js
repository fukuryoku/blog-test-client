import React from 'react';
import {connect} from 'react-redux';
import { Link } from "react-router-dom";

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LibraryAdd from '@material-ui/icons/LibraryAdd';
import ShoppingBasket  from '@material-ui/icons/ShoppingBasket';

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

const Drawer =(props)=>{

  
    const { classes } = props;

    const sideList = (
      <div className={classes.list}>
        <List>

          <Link to={`/users/${props.currentUser.user.id}/articles/new`}>
            <ListItem >
              <ListItemIcon><LibraryAdd />  </ListItemIcon>
              <ListItemText primary="Add Article" />
            </ListItem>
            </Link>


            <Link to="/">
              <ListItem >
                <ListItemIcon> <ShoppingBasket/></ListItemIcon>
                <ListItemText primary="Main" />
              </ListItem>
            </Link>

          
        </List>
      </div>
    );


    return (
      <div>        
        <SwipeableDrawer
          open={props.openLeft}
          onClose={props.toggleDrawer('left', false)}
          onOpen={props.toggleDrawer('left', true)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={props.toggleDrawer('left', false)}
            onKeyDown={props.toggleDrawer('left', false)}
          >
            {sideList}
          </div>
        </SwipeableDrawer>
      </div>
    );
  }

Drawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state){
  return{
    currentUser: state.currentUser
  };
}


export default connect(mapStateToProps, null)( withStyles(styles)(Drawer))
