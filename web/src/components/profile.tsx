import { IUser } from 'atoms/user';
import React from 'react';

interface IProps {
	user?: IUser;
}

const UserProfile: React.FC<IProps> = ({ user }) => {
	return (
		<>
			<div>UserProfile</div>
		</>
	);
};

export default UserProfile;
