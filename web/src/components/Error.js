import React from 'react'
import '../styles/Error.css'

const getErrorMessage = (statusCode) => {
    if (!statusCode) {
        return '';
    } else if (statusCode === 400) {
        return ', gdyż wystąpił błąd walidacji';
    } else if (statusCode === 401) {
        return ', gdyż nie jesteś zalogowany'
    } else if (statusCode === 403) {
        return ', gdyż nie masz uprawnień do tego zasobu'
    } else if (statusCode === 404) {
        return ', gdyż zasób nie istnieje'
    } else {
        return ', gdyż wystąpił błąd po stronie serwera. Skontaktuj się z administratorem systemu'
    }
}

const Error = props => {
    return (
        <div className="error">
            Operacja nie powiodła się
            {getErrorMessage(props.responseStatusCode)}
        </div>
    )
}

export default Error