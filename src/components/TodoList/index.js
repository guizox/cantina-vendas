import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

class TodoComponent extends PureComponent {
  render() {
    console.log(this.props);
    return <div>Todo List</div>;
  }
}

const mapStateToProps = ({ vendas }) => ({ vendas });

export default connect(mapStateToProps)(TodoComponent);
