import React, { Component } from 'react';
import { Provider } from 'react-redux';
import './App.css';
import store from './store';
import AppBarComponent from './components/AppBarComponent';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import EstoqueComponent from './components/EstoqueComponent';
import VendaComponent from './components/VendaComponent';
import CreateItem from './components/CreateItem';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppBarComponent />
        <BrowserRouter>
          <Switch>
            <Route path="/" exact={true} component={VendaComponent} />
            <Route path="/estoque" component={EstoqueComponent} />
            <Route path="/create" component={CreateItem} />
            <Route path="/create/:id" component={CreateItem} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
