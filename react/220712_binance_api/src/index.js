import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import './index.css';

import AppReact from './app';

const root = createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<AppReact />
	</React.StrictMode>
);
