/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, StrategyOptions } from 'passport-jwt';
import { jwtFromBearerToken } from './ jwt-extractor';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const options: StrategyOptions = {
      jwtFromRequest: jwtFromBearerToken,
      secretOrKey: process.env.JWT_SECRET_KEY ?? 'secret',
      ignoreExpiration: false,
    };

    super(options);
  }

  validate(payload: { sub: string; email: string }) {
    return { userId: payload.sub, email: payload.email };
  }
}
