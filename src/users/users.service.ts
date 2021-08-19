import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { UsersRepository } from "./users.repository";
import { UserDto } from "./dto/users.dto";
import { JwtService } from "@nestjs/jwt";
import { JwtPayloadInterface } from "./jwt-payload.interface";
import * as bcrypt from 'bcryptjs';
import { ObjectID } from "mongodb";
import { HttpException, HttpStatus } from "@nestjs/common";


export class UsersService {
    constructor(@InjectRepository(User) private readonly usersRepository: UsersRepository,
        private jwtService: JwtService
    ) {

    }

    async store(userDto: UserDto) {
        const userCheck = await this.usersRepository.findOne({ mobile: userDto.mobile })
        if (userCheck)
            throw new HttpException('User Already Exists', HttpStatus.CONFLICT);
        const numberCheck= await this.isValidBDMobileNumber(userDto.mobile)
        if (!numberCheck) throw new HttpException('Number Not Valid', HttpStatus.CONFLICT);

        userDto.pin = await bcrypt.hash(userDto.pin, 10)
        const user = await this.usersRepository.save(userDto)
        return await this.getAccessToken(user.id,user.user_type)
    }

    async login(userDto: UserDto) {


        const user = await this.usersRepository.findOne(
            {
                where: {
                    mobile: userDto.mobile
                }
            })

        const isMatch = await bcrypt.compare(userDto.pin, user.pin);

        if (!user)
            throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);

        if (!isMatch)
            throw new HttpException('UnAuthorized', HttpStatus.FORBIDDEN)
        return await this.getAccessToken(user.id,user.user_type)
    }

    async getAccessToken(id: ObjectID,userType:string): Promise<{ token: string }> {
        const user_type=userType
        const payload: JwtPayloadInterface = { id,user_type };
        const token = await this.jwtService.sign(payload);
        return { token };
    }

    async isValidBDMobileNumber(mobile: string): Promise<boolean> {
        const regexp = new RegExp(/^(?:\+88|01)?(?:\d{11}|\d{13})$/);
        return !!(await regexp.test(String(mobile)));
    }

    async checkUserAlreadyExists(mobile: string): Promise<User> {
        return await this.usersRepository.findUserByMobile(

            mobile,
        );
    }
}
