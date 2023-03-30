import { atom } from 'recoil';

export const supportedUserRoles = [
	'DOCTOR',
	'ADMIN',
	'RECEPTIONIST',
	'PHARMACIST',
	'INVENTORY_MANAGER',
	'CO_ADMIN',
	'OTHER',
] as const;

export interface IUser {
	id: string | number;
	name: string;
	email: string;
	profile: any;
	permissions: Array<string>;
	userRole: typeof supportedUserRoles[number];
}

export interface IAuth {
	isLoggedIn: Boolean;
	user: IUser | null;
	token: string | null;
	loading: Boolean;
	error: any | null;
}

export const authDefaultState: IAuth = {
	isLoggedIn: false,
	user: null,
	token: null,
	loading: false,
	error: null,
};

const authAtom = atom<IAuth>({
	key: 'auth',
	default: authDefaultState,
});

export default authAtom;
