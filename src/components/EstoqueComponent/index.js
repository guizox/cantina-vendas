import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

class EstoqueComponent extends PureComponent {
  render() {
    console.log(this.props);
    return <div>Estoque Component</div>;
  }
}

const mapStateToProps = ({ vendas }) => ({ vendas });

export default connect(mapStateToProps)(EstoqueComponent);
