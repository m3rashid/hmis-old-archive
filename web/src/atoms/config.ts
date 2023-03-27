import { atom } from 'recoil';

export interface IConfig {
	appThemeColor: string;
}

export const configDefaultState: IConfig = {
	appThemeColor: '#00FFFF',
};

const configAtom = atom<IConfig>({
	key: 'config',
	default: configDefaultState,
});

export default configAtom;
