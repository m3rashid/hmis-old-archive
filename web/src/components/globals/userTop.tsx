import { useNavigate } from 'react-router-dom';
import React, { useCallback, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import authAtom, { authDefaultState } from 'atoms/auth';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Modal, Popover, Space, Typography } from 'antd';

import configAtom from 'atoms/config';
import { instance } from 'api/instance';

interface IProps {}

const UserTop: React.FC<IProps> = () => {
	const [auth, setAuth] = useRecoilState(authAtom);
	const config = useRecoilValue(configAtom);
	const [authModalVisible, setAuthModalVisible] = useState(false);
	const navigate = useNavigate();

	const loginFailed = () => {
		message.error({
			content: `${config.otherStringMap['login'] || 'login'} Failed`,
			key: 'auth/login',
		});
	};

	const handleLogin = async (values: any) => {
		try {
			message.loading({ content: 'Loading...', key: 'auth/login' });
			const { data } = await instance.post('/auth/login', {
				email: values.email.trim(),
				password: values.password.trim(),
			});

			instance.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
			setAuth((prev) => ({ ...prev, isLoggedIn: true, user: data.user, token: data.token }));

			localStorage.setItem('refresh_token', data.refreshToken);
			// socket.io.opts.auth.token = data.token;
			// socket.disconnect().connect();

			message.success({
				content: `${config.otherStringMap['login'] || 'login'} Successful`,
				key: 'auth/login',
			});
			setAuthModalVisible(false);
		} catch (error) {
			loginFailed();
		}
	};

	const handleLogout = useCallback(() => {
		localStorage.removeItem('refresh_token');
		navigate('/');

		// socket.disconnect();
		setAuth(authDefaultState);
	}, [navigate, setAuth]);

	const closeModal = () => setAuthModalVisible(false);

	if (auth.isLoggedIn) {
		return (
			<Space>
				<Popover
					title={<Typography.Text>{auth.user?.name} is Logged in</Typography.Text>}
					content={
						<>
							<Typography.Text disabled>EMAIL : {auth.user?.email}</Typography.Text>
							<br />
							<Typography.Text disabled>ROLE : {auth.user?.profile?.role}</Typography.Text>
						</>
					}
					placement="leftBottom"
					style={{
						background: config.appDarkColor,
					}}
				>
					<UserOutlined />
				</Popover>
				<Button type="primary" onClick={() => setAuthModalVisible(true)} icon={<LogoutOutlined />}>
					{config.otherStringMap['logout'] || 'Logout'}
				</Button>
				<Modal
					title="Logout"
					okText="Logout"
					open={authModalVisible}
					onOk={handleLogout}
					onCancel={closeModal}
				>
					Are you sure, you want to {config.otherStringMap['logout'] || 'Logout'} ?
				</Modal>
			</Space>
		);
	}

	return (
		<>
			<Button onClick={() => setAuthModalVisible(true)}>
				{config.otherStringMap['login'] || 'Login'}
			</Button>
			<Modal
				title={config.otherStringMap['login'] || 'Login'}
				footer={null}
				open={authModalVisible}
				onOk={handleLogin}
				onCancel={closeModal}
			>
				<Form
					name="login"
					onFinish={handleLogin}
					initialValues={{ remember: true }}
					onFinishFailed={loginFailed}
					layout="horizontal"
					labelCol={{ span: 7 }}
					wrapperCol={{ span: 14 }}
				>
					<Form.Item
						rules={[{ required: true, message: 'Please enter your username!' }]}
						name="email"
						label="Email"
					>
						<Input placeholder="Email" />
					</Form.Item>
					<Form.Item
						name="password"
						label="Password"
						rules={[{ required: true, message: 'Please enter your password!' }]}
					>
						<Input placeholder="Password" type="password" />
					</Form.Item>
					<div
						style={{
							display: 'flex',
							justifyContent: 'flex-end',
							borderTop: `1px solid ${config.appLightBackground}`,
							margin: '24px -24px -10px -24px',
							padding: '10px 24px 0 24px',
						}}
					>
						<Button className="mr-[10px]" onClick={closeModal}>
							Cancel
						</Button>
						<Button type="primary" htmlType="submit">
							{config.otherStringMap['login'] || 'Login'}
						</Button>
					</div>
				</Form>
			</Modal>
		</>
	);
};

export default UserTop;
