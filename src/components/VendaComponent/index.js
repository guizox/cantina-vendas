import React from 'react';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import ItemDescription from './ItemDescription';
import VendaList from './VendaList';

const VendaComponent = props => (
  <Grid container direction="row">
    <Grid item xs={2}>
      <ItemDescription />
    </Grid>
    <Grid item xs={10}>
      <VendaList />
    </Grid>
  </Grid>
);

const mapStateToProps = ({ vendas }) => ({ vendas });

export default connect(mapStateToProps)(VendaComponent);
