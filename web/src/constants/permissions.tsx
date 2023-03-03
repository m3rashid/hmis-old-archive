const permissions = ['CREATE_USER', 'REMOVE_USER', 'MODIFY_USER'] as const;

export type IPermissions = typeof permissions;

export default permissions;
