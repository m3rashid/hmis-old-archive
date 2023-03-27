import axios from 'axios';
import { invoke } from '@tauri-apps/api';

const defaultServerUrl = 'http://localhost:4000';

export const isDesktopApp = !!(window as any).__TAURI__;

let serverRootUrl: string = '';

if (isDesktopApp) {
	invoke('get_environment_variable', { name: 'SERVER_URL' })
		.then((hostIp) => {
			if (hostIp) serverRootUrl = hostIp as string;
			else serverRootUrl = defaultServerUrl;
		})
		.catch(console.log);
} else serverRootUrl = defaultServerUrl;

export const instance = axios.create({
	baseURL: serverRootUrl + '/api',
});
