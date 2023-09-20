import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterInterface } from './interfaces/register.interface';
import { Model } from 'mongoose';
import { UsernameService } from './username.service';
import { LoginInterface } from './interfaces/login.interface';
import * as bcrypt from 'bcryptjs';

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
}

