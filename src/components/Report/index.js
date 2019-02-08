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
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Dialog
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import DescriptionIcon from '@material-ui/icons/Description';

import {
  getVendasAction,
  requestItensPerSellAction
} from '../../actions/relatorio';
import { formatCurrency } from '../../helper';
import classNames from 'classnames';

const styles = theme => ({
  spacing: {
    marginTop: '10px'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '90%'
  },
  dense: {
    marginTop: 16
  }
});

class Report extends PureComponent {
  state = {
    paymentType: '',
    date: '',
    open: false,
    totalAmount: 0
  };

  componentWillMount() {
    const { getVendasAction } = this.props;
    getVendasAction();
  }

  onChange = (field, value) => {
    this.setState({ ...this.state, [field]: value });
  };

  handleChange = ev => {
    this.setState({ ...this.state, paymentType: ev.target.value });
  };

  onClick() {
    const { getVendasAction } = this.props;
    getVendasAction(this.state);
  }

  render() {
    const {
      relatorio: { isLoading, vendas, itens },
      classes
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
        className={classes.spacing}
      >
        <CircularProgress />
      </Grid>
    ) : (
      <Grid container direction="column">
        <Dialog
          open={this.state.open}
          onClose={() => this.setState({ open: false, totalAmount: 0 })}
        >
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="right">Descrição</TableCell>
                  <TableCell align="right">Quantidade</TableCell>
                  <TableCell align="right">Valor</TableCell>
                  <TableCell align="right">Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {itens.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" align="right">
                      {item.descricao}
                    </TableCell>
                    <TableCell component="th" align="right">
                      {item.itemQuantity}
                    </TableCell>
                    <TableCell component="th" align="right">
                      {formatCurrency(item.valor)}
                    </TableCell>
                    <TableCell component="th" align="right">
                      {formatCurrency(item.totalItemAmount)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={3}>Valor da Venda</TableCell>
                  <TableCell align="right">
                    {formatCurrency(this.state.totalAmount)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </Dialog>
        <Grid item xs={12} className={classes.spacing}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item xs={5}>
              <TextField
                id="outlined-dense"
                label="Data"
                className={classNames(classes.textField, classes.dense)}
                margin="dense"
                variant="outlined"
                onChange={event => this.onChange('date', event.target.value)}
                value={this.state.date}
              />
            </Grid>
            <Grid item xs={5}>
              <FormControl
                variant="outlined"
                className={classNames(classes.textField, classes.dense)}
                fullWidth
              >
                <InputLabel
                  ref={ref => {
                    this.InputLabelRef = ref;
                  }}
                  htmlFor="outlined-age-simple"
                >
                  Metodo de Pagamento
                </InputLabel>
                <Select
                  value={this.state.paymentType}
                  onChange={this.handleChange}
                  input={
                    <OutlinedInput
                      labelWidth={160}
                      name="Metodo de Pagamento"
                      id="outlined-age-simple"
                    />
                  }
                >
                  <MenuItem value={''} />
                  <MenuItem value={'0'}>Dinheiro</MenuItem>
                  <MenuItem value={'1'}>Cartão Débito</MenuItem>
                  <MenuItem value={'2'}>Cartão Crédito</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => this.onClick()}
              >
                Filtrar
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid />
        <Grid item xs={12} className={classes.spacing}>
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
                      <TableCell
                        align="right"
                        onClick={ev =>
                          this.onChange('paymentType', item.paymentType)
                        }
                      >
                        {item.paymentType === '0'
                          ? 'Dinheiro'
                          : item.paymentType === '1'
                          ? 'Cartão Debito'
                          : 'Cartão de Crédito'}
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
                      <TableCell
                        align="right"
                        onClick={ev => this.onChange('date', item.date)}
                      >
                        {item.date}
                      </TableCell>
                      <TableCell align="right">
                        <Fab
                          color="secondary"
                          aria-label="Edit"
                          onClick={async () => {
                            const { requestItensPerSellAction } = this.props;
                            await requestItensPerSellAction(item.id);
                            this.setState({
                              open: true,
                              totalAmount: item.totalAmount
                            });
                          }}
                        >
                          <DescriptionIcon />
                        </Fab>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = ({ relatorio }) => ({ relatorio });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getVendasAction, requestItensPerSellAction }, dispatch);

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Report)
);
