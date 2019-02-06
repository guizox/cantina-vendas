import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  Paper,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Fab,
  CircularProgress,
  Grid
} from '@material-ui/core';

import DescriptionIcon from '@material-ui/icons/Description';

import { getVendasAction } from '../../actions/relatorio';
import { formatCurrency } from '../../helper';

class Report extends PureComponent {
  componentWillMount() {
    const { getVendasAction } = this.props;
    getVendasAction();
  }

  render() {
    const {
      relatorio: { isLoading, vendas }
    } = this.props;
    return isLoading ? (
      <Grid
        item
        container
        direction="row"
        xs={12}
        justify="center"
        alignItems="center"
        alignContent="center"
      >
        <CircularProgress />
      </Grid>
    ) : (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="right">id</TableCell>
              <TableCell align="right">Tipo Pagamento</TableCell>
              <TableCell align="right">Total Compra</TableCell>
              <TableCell align="right">Total Pago</TableCell>
              <TableCell align="right">Troco </TableCell>
              <TableCell align="right">Data </TableCell>
              <TableCell align="right">Detalhe </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vendas.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell align="right">{item.id}</TableCell>
                  <TableCell align="right">
                    {item.paymentType === '0' ? 'Dinheiro' : 'Cartão'}
                  </TableCell>
                  <TableCell align="right">
                    {formatCurrency(item.totalAmount)}
                  </TableCell>
                  <TableCell align="right">
                    {formatCurrency(item.amountPaid)}
                  </TableCell>
                  <TableCell align="right">
                    {formatCurrency(item.cashBack)}
                  </TableCell>
                  <TableCell align="right">{item.date}</TableCell>
                  <TableCell align="right">
                    <Fab color="secondary" aria-label="Edit" onClick={() => {}}>
                      <DescriptionIcon />
                    </Fab>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

const mapStateToProps = ({ relatorio }) => ({ relatorio });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getVendasAction }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Report);
