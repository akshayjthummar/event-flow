import { ExtractJwt, JwtFromRequestFunction } from 'passport-jwt';

export const jwtFromBearerToken =
  ExtractJwt.fromAuthHeaderAsBearerToken() as JwtFromRequestFunction<string>;
