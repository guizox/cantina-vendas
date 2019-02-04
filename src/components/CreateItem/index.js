import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { insertItemAction, updateItemAction } from '../../actions/estoque';
import { requestItemByIdAction } from '../../actions/vendas';

import { Grid, TextField, Button, CircularProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  loading: {
    marginTop: '20px'
  }
});

class CreateItem extends PureComponent {
  state = {
    description: '',
    value: 0,
    quantity: 0,
    isLoading: false
  };

  onChangeHandle = (field, value) => {
    this.setState({ ...this.state, [field]: value });
  };

  formatCurrency = value =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);

  async onClickHandle() {
    const {
      insertItemAction,
      updateItemAction,
      location: { search }
    } = this.props;
    const { description, value, quantity } = this.state;

    if (description === '' || value === 0 || quantity === 0) {
      alert('Algum dos campos está inválido, favor validar');
      return;
    }

    const resp =
      search === ''
        ? await insertItemAction(this.state)
        : await updateItemAction({
            id: parseInt(search.toString().replace('?id=', '')),
            ...this.state
          });
    if (resp.status === 200) {
      alert(
        search === ''
          ? 'Item inserido com sucesso'
          : 'Item atualizado com sucesso'
      );
    } else {
      alert('Erro no processamento, favor tentar novamente.');
    }
  }

  async componentWillMount() {
    const {
      requestItemByIdAction,
      location: { search }
    } = this.props;

    if (search.toString().replace('?id=', '') !== '') {
      this.setState({ ...this.state, isLoading: true });
    }

    const resp = await requestItemByIdAction(
      parseInt(search.toString().replace('?id=', ''))
    );
    if (resp[0]) {
      this.setState({
        description: resp[0].descricao,
        value: resp[0].valor,
        quantity: resp[0].quantidade,
        isLoading: false
      });
    } else {
      alert('Erro ao requisitar o item no servidor. Favor tente novamente');
      window.location.href = '/estoque';
    }
  }

  render() {
    const { description, value, quantity, isLoading } = this.state;
    const { classes } = this.props;
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
      <Grid item container spacing={16} alignItems="center" justify="center">
        <Grid item xs={8}>
          <TextField
            id="outlined-uncontrolled"
            label="Descrição"
            margin="normal"
            variant="outlined"
            fullWidth
            value={description}
            onChange={ev => this.onChangeHandle('description', ev.target.value)}
          />
        </Grid>

        <Grid item xs={8}>
          <TextField
            id="outlined-number"
            label="Valor"
            type="number"
            InputLabelProps={{
              shrink: true
            }}
            margin="normal"
            variant="outlined"
            fullWidth
            value={value}
            onChange={ev => this.onChangeHandle('value', ev.target.value)}
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            id="outlined-number"
            label="Quantidade"
            type="number"
            InputLabelProps={{
              shrink: true
            }}
            margin="normal"
            variant="outlined"
            fullWidth
            value={quantity}
            onChange={ev => this.onChangeHandle('quantity', ev.target.value)}
          />
        </Grid>
        <Grid item xs={8} container justify="center">
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.onClickHandle()}
          >
            {this.props.location.search === '' ? 'Novo Item' : 'Editar'}
          </Button>
        </Grid>
      </Grid>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { insertItemAction, updateItemAction, requestItemByIdAction },
    dispatch
  );

export default withStyles(styles)(
  connect(
    null,
    mapDispatchToProps
  )(CreateItem)
);

/*



*/
