import React from 'react';
import ReactDOM from 'react-dom/client';
import 'antd/dist/reset.css';

import 'index.css';
import App from 'app';
import { HotkeysProvider } from 'react-hotkeys-hook';
import { RecoilRoot } from 'recoil';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<React.StrictMode>
		<HotkeysProvider>
			<RecoilRoot>
				<App />
			</RecoilRoot>
		</HotkeysProvider>
	</React.StrictMode>
);
