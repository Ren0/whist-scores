import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js'
import Reboot from 'material-ui/Reboot';

const Main = () =>
<div>
	<Reboot />
	<App />
</div>

ReactDOM.render(
	<Main />,
	document.getElementById('root')
);
