import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

class VendaComponent extends PureComponent {
  render() {
    console.log(this.props);
    return <div>Venda Component</div>;
  }
}

const mapStateToProps = ({ vendas }) => ({ vendas });

export default connect(mapStateToProps)(VendaComponent);
