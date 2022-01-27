import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { App } from './components/app.js';
import { Home } from './components/home.js';
import { ws } from './store/store.js';


const Main = () => (
	<BrowserRouter>
		<Routes>
			<Route
				path='/todo/:itemId'
				element={<App />}
			>
			</Route>
			<Route
				path='/'
				element={<Home />}
			>
			</Route>
		</Routes>
	</BrowserRouter>
);


const root = document.getElementById('root');
ReactDOM.render(<Main />, root);

ws.on<string>('change', (payload) => {
	if (payload === 'main.js') {
		window.location.reload();
	}
	// ReactDOM.render(<Main timesRendered={rerenders} />, root);
});

(async () => {
	if (!('serviceWorker' in navigator)) {
		return;
	}
	window.addEventListener('load', function () {
		navigator.serviceWorker.register('/service-worker.js').then(function (registration) {
			// Registration was successful
			console.log('ServiceWorker registration successful with scope: ', registration.scope);
		}, function (err) {
			// registration failed :(
			console.log('ServiceWorker registration failed: ', err);
		});
	});
})();
