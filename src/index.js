import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

document.querySelectorAll('[data-review]').forEach((el) => {
  ReactDOM.render(<App />, el);
});
