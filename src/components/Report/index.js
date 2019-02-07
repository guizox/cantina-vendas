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
  OutlinedInput
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import DescriptionIcon from '@material-ui/icons/Description';

import { getVendasAction } from '../../actions/relatorio';
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
    date: ''
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
      relatorio: { isLoading, vendas },
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
                  <MenuItem value={'1'}>Cartão</MenuItem>
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
                          onClick={() => {}}
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
  bindActionCreators({ getVendasAction }, dispatch);

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Report)
);
