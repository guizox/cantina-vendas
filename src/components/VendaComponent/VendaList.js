import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import { removeItemAction } from '../../actions/vendas';
import { formatCurrency } from '../../helper';

const styles = theme => ({
  root: {
    marginTop: 18,
    width: '95%'
  }
});

const VendaList = ({ classes, vendas, removeItemAction }) => (
  <Paper className={classes.root}>
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell align="right" />
          <TableCell>id</TableCell>
          <TableCell align="right">Descrição</TableCell>
          <TableCell align="right">Valor</TableCell>
          <TableCell align="right">Quantidade</TableCell>
          <TableCell align="right">Valor Final</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {vendas.items.map((item, index) => (
          <TableRow key={index}>
            <TableCell align="left">
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={() => removeItemAction(index)}
              >
                Delete
                <DeleteIcon className={classes.rightIcon} />
              </Button>
            </TableCell>
            <TableCell component="th" scope="row">
              {index + 1}
            </TableCell>
            <TableCell align="right">{item.description}</TableCell>
            <TableCell align="right">
              {formatCurrency(item.product[0].valor)}
            </TableCell>
            <TableCell align="right">{item.quantity}</TableCell>
            <TableCell align="right">{formatCurrency(item.value)}</TableCell>
          </TableRow>
        ))}
        <TableRow>
          <TableCell rowSpan={3} />
          <TableCell colSpan={4}>Valor da Venda</TableCell>
          <TableCell align="right">{formatCurrency(vendas.amount)}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </Paper>
);

const mapStateToProps = ({ vendas }) => ({ vendas });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ removeItemAction }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(VendaList));
