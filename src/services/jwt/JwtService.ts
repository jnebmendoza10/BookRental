export interface JwtService {
    sign(payload: object | string, privateKey: string): string;
    verify(token: string, privateKey: string): string | object;
}
