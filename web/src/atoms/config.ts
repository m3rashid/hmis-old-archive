import { atom } from 'recoil';

type KvPairs = { [key: string]: string };
interface Developers {
	name: string;
	github: string;
	linkedIn: string;
	website: string;
	image: string;
}

export interface IConfig {
	appThemeColor: string;
	appDarkColor: string;
	appLightForeground: string;
	appLightBackground: string;
	appSidebarColor: string;
	appHeaderColor: string;
	appName: string;
	appFullName: string;
	appVersion: string;
	appLogo?: string;
	sidebarStringMap: KvPairs;
	otherStringMap: KvPairs;
	developers: Array<Developers>;
}

export const configDefaultState: IConfig = {
	appName: 'HMIS',
	appVersion: '1.0.0',
	appThemeColor: '#00BDC1',
	appDarkColor: '#484C56',
	appHeaderColor: '#484C56',
	appSidebarColor: '#484C56',
	appLightForeground: '#F9F9F9',
	appLightBackground: '#F1F1F1',
	appFullName: 'Health Management and Informatics System',
	sidebarStringMap: {
		home: 'Home',
		about: 'About',
		contact: 'Contact',
		learn: 'Learn',
		'learn-home': 'Home',
		'learn-modules': 'Modules',
	},
	otherStringMap: {
		login: 'Login',
		register: 'Register',
		logout: 'Logout',
	},
	developers: [],
};

const configAtom = atom<IConfig>({
	key: 'config',
	default: configDefaultState,
});

export default configAtom;
