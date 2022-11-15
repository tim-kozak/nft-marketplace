import React from 'react';
import { appObserver } from '../../core/state-management/utils';

import './styles/reset.css';
import './styles/app.css';

import Home from "../home";

const App = appObserver(() => {
  return (
    <div className="App">
        <Home />
    </div>
  );
});

export default App;
