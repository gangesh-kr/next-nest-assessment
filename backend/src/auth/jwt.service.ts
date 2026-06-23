import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SignJWT, jwtVerify } from 'jose';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class JwtService {
  private readonly secret: Uint8Array;
  private readonly expiresIn: number;

  constructor(private readonly configService: ConfigService) {
    const secretKey = this.configService.get<string>('JWT_SECRET', 'default-secret');
    this.secret = new TextEncoder().encode(secretKey);
    this.expiresIn = this.configService.get<number>('JWT_EXPIRES_IN', 3600);
  }

  async sign(payload: Pick<JwtPayload, 'sub' | 'email'>): Promise<string> {
    return new SignJWT({ sub: String(payload.sub), email: payload.email })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(`${this.expiresIn}s`)
      .sign(this.secret);
  }

  async verify(token: string): Promise<JwtPayload> {
    const { payload } = await jwtVerify(token, this.secret);
    return {
      sub: Number(payload.sub),
      email: payload.email as string,
      iat: payload.iat,
      exp: payload.exp,
    };
  }
}
