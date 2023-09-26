import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from 'src/user/entities/user.entity';
import { LoginDto } from './dtos/login.dto';
import { UserService } from 'src/user/user.service';
import { NotFoundError } from 'rxjs';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ReturnAddressDto } from 'src/address/dtos/returnAddress.dto';
import { ReturnUserDto } from 'src/user/dtos/returnUser.dto';
import { LoginPayload } from './dtos/loginPayload.dto';
import { ReturnLogin } from './dtos/returnLogin.dto';

@Injectable()
export class AuthService {
    
constructor(
    private readonly userService: UserService, private jwtService: JwtService) {}

    async login(loginDto: LoginDto): Promise<ReturnLogin> {
        const user: UserEntity | undefined = await this.userService
        .findUserByEmail(loginDto.email)
        .catch(() => undefined);


    const isMatch = await compare(loginDto.password, user?.password || '');


        if (!user || !isMatch) {
            throw new NotFoundException('Email or passord invalid')
        }

        return {
            accessToken: this.jwtService.sign({...new LoginPayload(user)}),
            user: new ReturnUserDto(user),
        };
    }
}
