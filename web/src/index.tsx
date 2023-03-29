import React from 'react';
import { RecoilRoot } from 'recoil';
import { ConfigProvider } from 'antd';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from 'App';
import AppLayout from 'components/globals/layout';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
	<React.StrictMode>
		<RecoilRoot>
			<ConfigProvider>
				<BrowserRouter>
					<AppLayout>
						<App />
					</AppLayout>
				</BrowserRouter>
			</ConfigProvider>
		</RecoilRoot>
	</React.StrictMode>
);
