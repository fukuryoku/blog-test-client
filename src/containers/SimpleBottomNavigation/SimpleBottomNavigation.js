import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Chip from '@material-ui/core/Chip';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = {
  root: {
    width: 500,
  }
};

class SimpleBottomNavigation extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {

    const { classes } = this.props;
    const { value } = this.state;
  

    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
        className={`${classes.root}, footerContainer`}
      >
        <Chip label={`Total articles: ${this.props.articles.length}`} className={classes.chip} />


       </BottomNavigation>
    );
  }
}

SimpleBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};


function mapStateToProps(state) {
  return {
    articles: state.articles,
    currentUser: state.currentUser
  };
}



export default connect(mapStateToProps, null)(
  withStyles(styles)(SimpleBottomNavigation)
);
