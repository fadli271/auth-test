import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entity/user.entity';
import { RefreshTokenRepository } from './repository/refresh-token.repository';
import { refreshTokenConfig } from 'src/config/jwt.config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  async login(LoginDto: LoginDto): Promise<any> {
    const user = await this.usersService.validateUser(LoginDto);
    if (!user) {
      throw new UnauthorizedException('Wrong email or password!');
    }
    const accessToken = await this.createAccessToken(user);
    const refreshToken = await this.createRefreshToken(user);

    return { accessToken, refreshToken };
  }

  async createAccessToken(user: User): Promise<string> {
    const payload = {
      sub: user.id,
    };
    return await this.jwtService.signAsync(payload);
  }

  async createRefreshToken(user: User): Promise<string> {
    const refreshToken = await this.refreshTokenRepository.createRefreshToken(
      user,
      +refreshTokenConfig.expiresIn,
    );

    const payload = {
      jid: refreshToken.id,
    };

    const signedRefreshToken = await this.jwtService.signAsync(
      payload,
      refreshToken,
    );

    return signedRefreshToken;
  }
}
