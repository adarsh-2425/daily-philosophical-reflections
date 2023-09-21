import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterInterface } from './interfaces/register.interface';
import { Model } from 'mongoose';
import { UsernameService } from './username.service';
import { LoginInterface } from './interfaces/login.interface';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import * as jwt from 'jsonwebtoken';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { UserInterface } from './interfaces/user.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<RegisterInterface>,
        private usernameService: UsernameService
        ){}

    // Register
    async register(user: RegisterInterface): Promise<RegisterInterface> {
        const newUser = new this.userModel(user);

        // generate random username
        user.username = await this.usernameService.generateUsername();

        // Hash password
        user.password = await bcrypt.hash(user.password, 10);

        return await newUser.save();
    }

    // Login Service
    async login(loginDto: LoginDto): Promise<{token: string, user: UserInterface}> {

        const user = await this.userModel.findOne({email: loginDto.email});

        if (!user) {
            throw new UnauthorizedException('User does not exist. Check your email')
        }

        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid password');
        }

        // Generate JWT Token
        const token = jwt.sign({sub: user._id, username: user.username}, 'secret', {
            expiresIn: '5h'
        })

        return { token, user: {id: user.id, username: user.username}};
    }
}

