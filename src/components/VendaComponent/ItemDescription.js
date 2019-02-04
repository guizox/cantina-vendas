import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, TextField, Button, CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import classNames from 'classnames';
import {
  addItemAction,
  closeSellAction,
  requestItemByIdAction
} from '../../actions/vendas';
import { getStockAction } from '../../actions/estoque';
import { bindActionCreators } from 'redux';

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
    discount: 0,
    isLoading: false
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
    debugger;

    if (field === 'quantity' && value && value > 0) {
      this.setState({
        ...this.state,
        value: parseFloat(value.toString()) * parseFloat(product[0].valor)
      });
    } else {
      this.setState({
        ...this.state,
        value: product.value
      });
    }
  };

  formatCurrency = value =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);

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

  closeSelling() {
    const { closeSellAction } = this.props;
    const { discount, paymentValue } = this.state;
    debugger;

    if (discount < 0 || paymentValue === 0) {
      alert(
        'Esta venda está com valores incorretos. Favor corrigir para prosseguir'
      );
      return;
    }

    this.setState({
      cod: '',
      description: '',
      quantity: 1,
      value: '0',
      product: {}
    });
    closeSellAction();
  }

  onChangePaymentValue = value => {
    const { amount } = this.props.vendas;
    this.setState({
      ...this.state,
      paymentValue: value,
      discount: value - amount
    });
  };

  render() {
    const { classes } = this.props;
    const {
      value,
      cod,
      description,
      quantity,
      paymentValue,
      discount,
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
            value={description}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="outlined-dense"
            label="Valor"
            className={classNames(classes.textField, classes.dense)}
            margin="dense"
            variant="outlined"
            value={value}
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
            value={discount}
          />
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
