import React from 'react'
import Cookies from 'universal-cookie'
import Error from './Error'
import { decodeToken } from 'react-jwt'

const PermissionsChecker = props => {
    const cookies = new Cookies()
    const token = cookies.get('loginToken')

    const payload = decodeToken(token)
    if (payload.role === undefined || payload.role < props.minRole) {
        return <Error permissionsError />;
    } else {
        return <>{props.children}</>;
    }
};

export default PermissionsChecker;
