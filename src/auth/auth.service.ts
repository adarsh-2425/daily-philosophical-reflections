import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { registerInterface } from './interfaces/register.interface';
import { Model } from 'mongoose';
import { UsernameService } from './username.service';

@Injectable()
export class AuthService {
    constructor(@InjectModel('User') private readonly userModel: Model<registerInterface>){}

    // Register
    
}

