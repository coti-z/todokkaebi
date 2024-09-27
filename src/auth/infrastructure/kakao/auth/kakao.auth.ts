import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class KakaoAuth {
  private readonly CLIENT_ID: string;
  private readonly REDIRECT_URL: string;
  private readonly CLIENT_SECRET: string;
  private readonly AUTH_URL: string = 'https://kauth.kakao.com/oauth/authorize';
  private readonly TOKEN_URL: string = 'https://kauth.kakao.com/oauth/token';
  private readonly USER_INFO_URL: string = 'https://kapi.kakao.com/v2/user/me';

  constructor(private readonly configService: ConfigService) {
    this.CLIENT_ID = this.configService.get<string>('KAKAO_CLIENT_ID') || '';
    this.REDIRECT_URL =
      this.configService.get<string>('KAKAO_REDIRECT_URL') || '';
    this.CLIENT_SECRET =
      this.configService.get<string>('KAKAO_CLIENT_SECRET') || '';
  }

  getAuthorizationUrl(): string {
    const params = new URLSearchParams({
      client_id: this.CLIENT_ID,
      redirect_uri: this.REDIRECT_URL,
      response_type: 'code',
    });
    return `${this.AUTH_URL}?${params.toString()}`;
  }

  async getToken(code: string) {
    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: this.CLIENT_ID,
      redirect_uri: this.REDIRECT_URL,
      client_secret: this.CLIENT_SECRET,
      code: code,
    });
    const response = await axios.post(this.TOKEN_URL, params.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });
    return response.data;
  }

  async getUser(accessToken: string) {
    const response = await axios.get(this.USER_INFO_URL, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  }
}
