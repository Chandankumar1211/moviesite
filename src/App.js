import React from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom'
import MovieDetails from './Component/MovieDetails';
import MovieList from './Component/MovieList'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div>
      <HashRouter basename="/">
        <Switch>
          <Route path="/" exact component={MovieList} />
          <Route path='/movie-details/:id' exact component={MovieDetails} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
