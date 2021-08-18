import './App.scss';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GraphicData from './components/GraphicData';
import Home from './components/Home';
import IpcDetaill from './components/IpcDetaill';
import Header from './components/Header';
import GuardedRoute from './config/guarded-route';


function App() {
  return (
    <Router>
      <Provider store={store}>
        <Header />
        <div>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/ipc-graphic" component={GraphicData}/>
            <GuardedRoute path='/ipc-detail' component={IpcDetaill}/>
          </Switch>
        </div>
      </Provider>
    </Router>
  );
}

export default App;
