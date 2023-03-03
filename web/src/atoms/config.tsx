import { atom } from 'recoil';

export interface IConfig {
	appName: string;
	appLogo: string;
}

const configAtom = atom<IConfig>({
	key: 'config',
	default: {
		appName: 'Template App',
		appLogo:
			'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
	},
});

export default configAtom;
