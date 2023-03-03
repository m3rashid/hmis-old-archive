import { IUser } from 'atoms/user';
import { Dropdown, Modal } from 'antd';
import React, { useState } from 'react';
import { BetaSchemaForm, ProLayoutProps } from '@ant-design/pro-components';
import { LogoutOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { toSentenceCase } from 'utils/strings';
import loginFromSchema from 'components/forms/login';
import logoutSchema from 'components/forms/logout';
import addUserSchema from 'components/forms/addUser';
import UserProfile from 'components/profile';

const constants = {
	login: 'LOGIN',
	addUser: 'ADD_USER',
	logout: 'LOGOUT',
	profile: 'PROFILE',
} as const;

const modalType = Object.values(constants);

interface IModal {
	type: typeof modalType[number] | null;
}

const UserTop: (user: IUser) => ProLayoutProps['avatarProps'] = (user) => {
	const [modal, setModal] = useState<IModal>({ type: null });

	const closeModal = () => setModal((prev) => ({ ...prev, type: null }));

	return {
		size: 'small',
		title:
			window.innerWidth > 600 ? (!user || !user.isLoggedIn ? 'Login to Continue' : user.name) : '',
		...(user.isLoggedIn ? { src: user.profilePhoto } : {}),
		render: (props, dom) => {
			return (
				<>
					<Modal
						open={modal.type !== null}
						footer={null}
						onCancel={closeModal}
						title={modal.type
							?.split('_')
							.map((t) => toSentenceCase(t))
							.join(' ')}
					>
						{[constants.login, constants.addUser, constants.logout].includes(modal.type as any) ? (
							<BetaSchemaForm
								// @ts-ignore
								columns={
									modal.type === 'ADD_USER'
										? addUserSchema
										: modal.type === 'LOGOUT'
										? logoutSchema
										: loginFromSchema
								}
							/>
						) : (
							<UserProfile user={user} />
						)}
					</Modal>

					<Dropdown
						menu={{
							items: [
								...(!user || !user.isLoggedIn
									? [
											{
												key: 'login',
												icon: <UserAddOutlined />,
												label: 'Login',
												onClick: () => {
													setModal((prev) => ({ ...prev, type: 'LOGIN' }));
												},
											},
									  ]
									: [
											{
												key: 'profile',
												icon: <UserOutlined />,
												label: 'Profile',
												onClick: () => {
													setModal((prev) => ({ ...prev, type: 'PROFILE' }));
												},
											},
											...(user.permissions.includes('CREATE_USER')
												? [
														{
															key: 'addUser',
															icon: <UserAddOutlined />,
															label: 'Add User',
															onClick: () => {
																setModal((prev) => ({ ...prev, type: 'ADD_USER' }));
															},
														},
												  ]
												: []),
											{
												key: 'logout',
												icon: <LogoutOutlined />,
												label: 'Logout',
												onClick: () => {
													setModal((prev) => ({ ...prev, type: 'LOGOUT' }));
												},
											},
									  ]),
							],
						}}
					>
						{dom}
					</Dropdown>
				</>
			);
		},
	};
};

export default UserTop;
