import {InjectRepository} from "@nestjs/typeorm";

import {User} from "../users/user.entity";
import {UsersInformationRepository} from "./users-information.repository";
import {CreateUsersInformationDto} from "./dto/create-users-information.dto";
import {HttpException} from "@nestjs/common";

export class UserInformationService {
    constructor(@InjectRepository(UsersInformationRepository) private readonly usersInformationRepository: UsersInformationRepository,
    ) {
    }
    async store(usersInformationDto:CreateUsersInformationDto){
        return await this.usersInformationRepository.save(usersInformationDto)
    }

    async update(id:string,usersInformationDto:CreateUsersInformationDto){
        const user = await this.usersInformationRepository.findOneOrFail(id);
        if (!user) throw new HttpException('User Not Found', 404);
        return await this.usersInformationRepository.update(id,usersInformationDto)
    }

    async getCustomer(id:string){
        const user = await this.usersInformationRepository.findOneOrFail(id);
        return user
    }

}
