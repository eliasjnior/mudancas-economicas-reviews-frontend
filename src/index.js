import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

document.querySelectorAll('[data-review]').forEach((el) => {
  const companyId = el.getAttribute('data-review');
  if (companyId) {
    ReactDOM.render(<App companyId={companyId} />, el);
  }
});
