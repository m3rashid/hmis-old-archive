import { atom } from 'recoil';

export interface IAuth {}

export const authDefaultValue: IAuth = {};

const authAtom = atom<IAuth>({
	key: 'auth',
	default: authDefaultValue,
});

export default authAtom;
