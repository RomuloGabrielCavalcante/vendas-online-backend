import { LoginPayload } from "src/auth/dtos/loginPayload.dto"

export const authorizantionToLoginPayload = (authorization: string,
): LoginPayload => {
    const authorizedSplited = authorization.split('.');

    if (authorizedSplited.length < 3 || !authorizedSplited[1]) {
        return undefined;
    }

    return JSON.parse(Buffer.from(authorizedSplited[1], 'base64').toString('ascii'))
}