import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user.service';
import { IAppConfig } from '../../../config/config.interface';
import { IJwtPayload } from '../interface/jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<IAppConfig>('app').publicKey,
    });
  }

  async validate(payload: IJwtPayload) {
    const { id } = payload;

    try {
      if (!id) {
        throw new UnauthorizedException('kindly login');
      }

      const user = await this.userService.findOne({ id: id });

      return user;
    } catch (error) {
      throw error;
    }
  }
}
