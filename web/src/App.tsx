import 'antd/dist/reset.css';
import 'index.css';
import React, { Fragment } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import authAtom from 'atoms/auth';
// import configAtom from 'atoms/config';
import { instance } from 'api/instance';
import Loading from 'components/globals/loading';
import { Route, Routes } from 'react-router-dom';
import routes from 'components/globals/routes';

const App = () => {
	const [auth, setAuth] = useRecoilState(authAtom);
	// const [config, setConfig] = useRecoilState(configAtom);
	const [isLoading, setIsLoading] = useState(false);

	// set App Config
	const getAppConfig = useCallback(async () => {
		// getConfig().then((config) => setConfig(config));
	}, []);

	// revalidate JWTs
	const revalidate = useCallback(async () => {
		setTimeout(() => {
			// revalidateJWT(setAuth)
			// 	.then((res) => {
			// 		socket.io.opts.auth.token = res.token;
			// 		socket.disconnect().connect();
			// 	})
			// 	.catch(console.log)
			// 	.finally(() => setIsLoading(false));
		}, 1000);
	}, []);

	useEffect(() => {
		revalidate();
		getAppConfig();
	}, [revalidate, getAppConfig]);

	useEffect(() => {
		if (auth.isLoggedIn) {
			instance.defaults.headers.common['Authorization'] = `Bearer ${auth.token}`;
		}
	}, [auth]);

	if (isLoading) return <Loading />;

	return (
		<Routes>
			{routes.map((route) => {
				return (
					<Fragment>
						<Route path={route.link} element={<route.Component {...route.props} />} />;
						{route.nestedLinks?.map((nestedRoute) => {
							return (
								<Route
									key={nestedRoute.link}
									path={route.link + nestedRoute.link}
									element={<nestedRoute.Component />}
								/>
							);
						})}
					</Fragment>
				);
			})}
		</Routes>
	);
};

export default App;
