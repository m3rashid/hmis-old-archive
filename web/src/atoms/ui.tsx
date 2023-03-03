import { atom } from 'recoil';

export interface IUi {}

const uiAtom = atom<IUi>({
	key: 'ui',
	default: {},
});

export default uiAtom;
