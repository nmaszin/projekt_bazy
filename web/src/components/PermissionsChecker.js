import React from 'react'
import Cookies from 'universal-cookie'
import { decodeToken } from 'react-jwt'

const PermissionsChecker = props => {
    const cookies = new Cookies()
    const token = cookies.get('loginToken')

    const payload = decodeToken(token)
    if (payload.role === undefined || payload.role < props.minRole) {
        return <div>You don't have permissions to this resource</div>;
    } else {
        return <>{props.children}</>;
    }
};

export default PermissionsChecker;
