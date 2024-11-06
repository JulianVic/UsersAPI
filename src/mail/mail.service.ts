import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '../user/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserWelcome(user: User, plainPassword: string) {
    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Bienvenido',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background-color: #3B82F6; padding: 20px; border-radius: 8px 8px 0 0;">
              <h1 style="color: white; margin: 0; text-align: center;">¡Bienvenido ${user.name}!</h1>
            </div>
            
            <div style="border: 1px solid #e5e7eb; border-top: none; padding: 20px; border-radius: 0 0 8px 8px;">
              <p style="color: #374151; font-size: 16px; line-height: 24px;">Tu cuenta ha sido creada exitosamente.</p>
              
              <div style="background-color: #f3f4f6; padding: 15px; border-radius: 6px; margin: 20px 0;">
                <p style="color: #374151; font-size: 16px; margin: 0 0 10px 0;">Tus credenciales de acceso son:</p>
                <p style="color: #374151; margin: 5px 0;"><strong>Email:</strong> ${user.email}</p>
                <p style="color: #374151; margin: 5px 0;"><strong>Contraseña:</strong> ${plainPassword}</p>
              </div>
              
              <p style="color: #6b7280; font-size: 14px; text-align: center; margin-top: 20px;">
                Si tienes alguna pregunta, no dudes en contactarnos.
              </p>
            </div>
          </div>
        `,
      });
    } catch (error) {
      console.error('Error enviando email:', error);
    }
  }
} 