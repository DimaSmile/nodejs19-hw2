import jsonwebtoken, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import AuthenticationException from '../exceptions/AuthenticationException';

export interface Token {
    id: string;
    login: string;
    iat: number;
    exp: number;
}

export class Jwt {
    public sign(payload: object): object {
        if (process.env.SECRET === undefined) {
            throw new Error('Environment variable is not defined');
        }

        const token = jsonwebtoken.sign(payload, process.env.SECRET!, { expiresIn: 1200 });

        return { token };
    }

    public verifyToken(token: string): Promise<Token> {
        if (process.env.SECRET === undefined) {
            throw new Error('Environment variable is not defined');
        }

        return new Promise((resolve, reject): void => {
            jsonwebtoken.verify(token, process.env.SECRET!, (err?: VerifyErrors | null, decoded?: string | JwtPayload | undefined) => {
                if (err) {
                    reject(new AuthenticationException('Token is invalid'));
                    return;
                }

                resolve(decoded as Token);
            });
        });
    }
}

export const jwt = new Jwt();

