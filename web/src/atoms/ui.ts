import { atom } from 'recoil';

export interface IUi {
	sidebarCollapsed: Boolean;
	isMobile: Boolean;
}

export const defaultUiState: IUi = {
	sidebarCollapsed: false,
	isMobile: window.innerWidth < 500,
};

const uiAtom = atom<IUi>({
	key: 'ui',
	default: defaultUiState,
});

export default uiAtom;
