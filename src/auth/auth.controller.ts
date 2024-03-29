import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterInterface } from './interfaces/register.interface';
import { Post, Body } from '@nestjs/common'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    // Regesiter Route
    @Post('register')
    register(@Body() registerDto: RegisterDto): Promise<RegisterInterface> {
        return this.authService.register(registerDto);
    }

    // Login Route
}
