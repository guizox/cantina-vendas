import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Grid, Fab } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Product from './Product';
import { getStockAction } from '../../actions/estoque';

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit
  }
});

class EstoqueComponent extends PureComponent {
  constructor(props) {
    super(props);
    if (prompt('Digite a senha de administrador') === '12debora3') {
      props.getStockAction();
    }
  }

  render() {
    const { classes, estoque } = this.props;
    return (
      <Grid item container direction="row">
        <Grid item container xs={12} alignContent="flex-end" justify="flex-end">
          {estoque.items.length > 0 ? (
            <Fab
              color="primary"
              aria-label="Add"
              className={classes.fab}
              onClick={() => {
                window.location.href = '/create';
              }}
            >
              <AddIcon />
            </Fab>
          ) : null}
        </Grid>
        <Grid item xs={12}>
          <Product estoque={estoque} />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = ({ estoque }) => ({ estoque });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getStockAction }, dispatch);

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EstoqueComponent)
);
