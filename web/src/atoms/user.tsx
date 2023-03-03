import { IPermissions } from 'constants/permissions';
import { atom } from 'recoil';

export interface IUser {
	id: string;
	name: string;
	email: string;
	role?: string;
	permissions: Partial<IPermissions>;
	profilePhoto: string;
	isLoggedIn: boolean;
}

const userAtom = atom<IUser>({
	key: 'user',
	default: {
		id: '1',
		name: 'MD Rashid Hussain',
		email: 'm3rashid.hussain@gmail.com',
		role: 'ADMIN',
		permissions: [],
		profilePhoto:
			'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
		isLoggedIn: false,
	},
});

export default userAtom;
