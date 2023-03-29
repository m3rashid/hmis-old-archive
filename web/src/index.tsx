import React from 'react';
import { RecoilRoot } from 'recoil';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from 'App';
import RootContainer from 'components/globals/rootContainer';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
	<React.StrictMode>
		<RecoilRoot>
			<BrowserRouter>
				<RootContainer>
					<App />
				</RootContainer>
			</BrowserRouter>
		</RecoilRoot>
	</React.StrictMode>
);
