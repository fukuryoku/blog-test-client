import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '../Drawer/Drawer';
import Logo from '../../components/Logo/Logo';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {logout} from '../../store/actions/auth'

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class ButtonAppBar extends Component  {

    state = {
    top: false,
    left: false,
    bottom: false,
    right: false,
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  logout = e => {
    e.preventDefault();
    this.props.logout();
  };


  render(){

    const { classes } = this.props;
    return (
      <>
        <div className={classes.root}>
          <AppBar position="static" color="secondary">
            <Toolbar>
              <IconButton 
              className={classes.menuButton} 
              color="inherit" 
              aria-label="Menu"
              onClick={this.toggleDrawer('left', true)}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.grow}>
              <Logo/>
              </Typography>

              {this.props.currentUser.isAuthenticated ?(
                <>
                <Button color="inherit">{`Hello Mr/s ${this.props.currentUser.user.username}`}</Button>
                <Button color="inherit" onClick={this.logout}>Logout</Button>
                </>
              ):(
                <>
                <Link to="/signin"><Button color="inherit">Sign in</Button></Link>
                <Link to="/signup"><Button color="inherit">Sign up</Button></Link>
                </>)}

              
            </Toolbar>
          </AppBar>
        </div>

        <Drawer 
        toggleDrawer={this.toggleDrawer}
        openLeft={this.state.left}
        />

      </>
  
    );
  

  }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state){
  return{
    currentUser: state.currentUser
  };
}




export default connect(mapStateToProps, {logout})(withStyles(styles)(ButtonAppBar))
