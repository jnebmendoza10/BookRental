import { JwtService } from './JwtService';
import * as jwt from 'jsonwebtoken';
import { InvalidJsonWebTokenError } from './InvalidJsonWebTokenError';

export class DefaultJwtService implements JwtService {
    public sign(payload: object | string, privateKey: string): string {
        try {
            const token = jwt.sign(payload, privateKey, { algorithm: 'RS512', expiresIn: '1h' });
            return token;
        } catch (error) {
            throw new Error();
        }
    }
    public verify(token: string, privateKey: string): string | object {
        try {
            const payload = jwt.verify(token, privateKey);
            return payload;
        } catch (error) {
            throw new InvalidJsonWebTokenError();
        }
    }
}
