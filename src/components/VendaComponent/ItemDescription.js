import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid,
  TextField,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem
} from '@material-ui/core';
import { connect } from 'react-redux';
import classNames from 'classnames';
import {
  addItemAction,
  closeSellAction,
  requestItemByIdAction
} from '../../actions/vendas';
import { getStockAction } from '../../actions/estoque';
import { bindActionCreators } from 'redux';
import { formatCurrency } from '../../helper';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '90%'
  },
  dense: {
    marginTop: 16
  },
  button: {
    marginTop: '300px',
    textAlign: 'center'
  },
  loading: {
    marginTop: '20px'
  }
});

class ItemDescription extends PureComponent {
  state = {
    cod: '',
    description: '',
    quantity: 1,
    value: '0',
    product: {},
    paymentValue: 0,
    cashBack: 0,
    isLoading: false,
    paymentType: 0
  };

  async componentWillMount() {
    const { getStockAction } = this.props;
    await this.setState({ ...this.state, isLoading: true });
    await getStockAction();
    await this.setState({ ...this.state, isLoading: false });
  }

  onChangeCode = async id => {
    const { estoque } = this.props;

    const data = estoque.items.filter(item => item.id === id);
    if (data[0]) {
      this.setState({
        cod: id,
        description: data[0].descricao,
        value: data[0].valor,
        product: data
      });
    } else {
      this.setState({
        description: '',
        value: '0',
        product: {},
        cod: id
      });
    }
  };

  onChange = async (field, value) => {
    const { product } = this.state;

    if (field === 'quantity' && value && value > 0) {
      this.setState({
        ...this.state,
        value: parseFloat(value.toString()) * parseFloat(product[0].valor),
        quantity: parseFloat(value.toString())
      });
    } else {
      this.setState({
        ...this.state,
        value: product.value
      });
    }
  };

  onKeyUpHandler = ev => {
    const { addItemAction } = this.props;
    if (ev.keyCode === 13) {
      if (this.state.value > 0) {
        addItemAction(this.state);
        this.setState({
          description: '',
          value: '0',
          product: {},
          cod: ''
        });
      }
    } else if (ev.keyCode === 32) {
      this.closeSelling();
    }
  };

  async closeSelling() {
    const { closeSellAction, vendas } = this.props;
    const { cashBack, paymentValue, paymentType } = this.state;

    if ((cashBack < 0 || paymentValue === 0) && paymentType === 0) {
      alert(
        'Esta venda está com valores incorretos. Favor corrigir para prosseguir'
      );
      return;
    }

    const postObject = { ...vendas };
    postObject.cashBack = this.state.cashBack;
    postObject.payment =
      this.state.paymentType === 0 ? this.state.paymentValue : vendas.amount;
    postObject.paymentType = this.state.paymentType;

    await this.setState({
      cod: '',
      description: '',
      quantity: 1,
      value: '0',
      product: {},
      cashBack: 0,
      paymentValue: 0
    });

    closeSellAction(postObject);
  }

  onChangePaymentValue = async value => {
    const { amount } = this.props.vendas;
    await this.setState({
      ...this.state,
      paymentValue: parseFloat(value),
      cashBack: parseFloat(value) - amount
    });
  };

  handleChange = ev => {
    this.setState({ ...this.state, paymentType: ev.target.value });
  };

  render() {
    const { classes } = this.props;
    const {
      value,
      cod,
      description,
      quantity,
      paymentValue,
      cashBack,
      isLoading
    } = this.state;
    return isLoading ? (
      <Grid
        item
        container
        direction="row"
        xs={12}
        justify="center"
        alignItems="center"
        alignContent="center"
        className={classes.loading}
      >
        <CircularProgress />
      </Grid>
    ) : (
      <Grid
        container
        direction="column"
        onKeyUp={ev => this.onKeyUpHandler(ev)}
      >
        <Grid item xs={12}>
          <TextField
            id="outlined-dense"
            label="Código"
            className={classNames(classes.textField, classes.dense)}
            margin="dense"
            variant="outlined"
            onChange={event => this.onChangeCode(event.target.value)}
            value={cod}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-dense"
            label="Quantidade"
            className={classNames(classes.textField, classes.dense)}
            margin="dense"
            variant="outlined"
            value={quantity}
            onChange={ev => this.onChange('quantity', ev.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-dense"
            label="Descrição"
            className={classNames(classes.textField, classes.dense)}
            margin="dense"
            variant="outlined"
            disabled={true}
            value={description}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="outlined-dense"
            label="Valor"
            className={classNames(classes.textField, classes.dense)}
            disabled={true}
            margin="dense"
            variant="outlined"
            value={formatCurrency(value)}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="outlined-dense"
            label="Valor Pago"
            className={classNames(classes.textField, classes.dense)}
            margin="dense"
            variant="outlined"
            onChange={ev => this.onChangePaymentValue(ev.target.value)}
            value={paymentValue}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="outlined-dense"
            label="Troco"
            className={classNames(classes.textField, classes.dense)}
            margin="dense"
            variant="outlined"
            disabled={true}
            value={formatCurrency(cashBack)}
          />
        </Grid>

        <Grid item xs={12}>
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
              <MenuItem value={0}>Dinheiro</MenuItem>
              <MenuItem value={1}>Cartão</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} className={classes.button}>
          <Button
            size="large"
            color="primary"
            variant="contained"
            onClick={() => this.closeSelling()}
          >
            Finalizar Venda
          </Button>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = ({ vendas, estoque }) => ({ vendas, estoque });

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { addItemAction, closeSellAction, requestItemByIdAction, getStockAction },
    dispatch
  );

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ItemDescription)
);
