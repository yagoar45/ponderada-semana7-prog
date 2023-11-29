import { Injectable, UnauthorizedException } from "@nestjs/common";
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  private readonly secretKey = process.env.JWT_AUTH_KEY;

  generateToken(userId: number): string {
    const payload = { sub: userId };
    return jwt.sign(payload, this.secretKey, { expiresIn: '1h' }); 
  }

  // Método para verificar um token JWT
  verifyToken(token: string): any {
    try {
      const payload = jwt.verify(token, this.secretKey);
      return payload;
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
