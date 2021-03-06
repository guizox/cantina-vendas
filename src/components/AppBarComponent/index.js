import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

function AppBarComponent(props) {
  const { classes } = props;

  const handleClick = value => {
    window.location.href = `/${value}`;
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" onClick={() => handleClick('')}>
            Venda
          </Button>
          <Button color="inherit" onClick={() => handleClick('estoque')}>
            Estoque
          </Button>
          <Button color="inherit" onClick={() => handleClick('relatório')}>
            Relatório
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

AppBarComponent.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AppBarComponent);
