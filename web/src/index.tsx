import React from 'react';
import { RecoilRoot } from 'recoil';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import RootContainer from 'components/globals/rootContainer';

import App from 'App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<RecoilRoot>
				<RootContainer>
					<App />
				</RootContainer>
			</RecoilRoot>
		</BrowserRouter>
	</React.StrictMode>
);
