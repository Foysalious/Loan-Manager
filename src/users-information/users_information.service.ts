import {InjectRepository} from "@nestjs/typeorm";


import {UsersInformationRepository} from "./users-information.repository";
import {CreateUsersInformationDto} from "./dto/create-users-information.dto";
import {HttpException} from "@nestjs/common";
import {AwsS3} from "../users/aws-s3";

export class UserInformationService {
    constructor(@InjectRepository(UsersInformationRepository) private readonly usersInformationRepository: UsersInformationRepository,private readonly aws3:AwsS3
    ) {
    }
    async store(usersInformationDto:CreateUsersInformationDto){
        // eslint-disable-next-line @typescript-eslint/camelcase
       if (usersInformationDto.employment_proff_image) usersInformationDto.employment_proff_image= await this.aws3.uploadFile( usersInformationDto.employment_proff_image)
        if (usersInformationDto.photo) usersInformationDto.photo= await this.aws3.uploadFile( usersInformationDto.photo)
        if (usersInformationDto.photo) usersInformationDto.photo= await this.aws3.uploadFile( usersInformationDto.photo)
        if (usersInformationDto.nid_front_side) usersInformationDto.nid_front_side= await this.aws3.uploadFile( usersInformationDto.nid_front_side)
        if (usersInformationDto.nid_back_side) usersInformationDto.nid_back_side= await this.aws3.uploadFile( usersInformationDto.nid_back_side)
        if (usersInformationDto.salary_certificate) usersInformationDto.salary_certificate= await this.aws3.uploadFile( usersInformationDto.salary_certificate)
        if (usersInformationDto.bank_statement) usersInformationDto.bank_statement= await this.aws3.uploadFile( usersInformationDto.bank_statement)
        if (usersInformationDto.utility_bill) usersInformationDto.utility_bill= await this.aws3.uploadFile( usersInformationDto.utility_bill)
        if (usersInformationDto.additional_document_1) usersInformationDto.additional_document_1= await this.aws3.uploadFile( usersInformationDto.additional_document_1)
        if (usersInformationDto.additional_document_2) usersInformationDto.additional_document_2= await this.aws3.uploadFile( usersInformationDto.additional_document_2)
        return await this.usersInformationRepository.save(usersInformationDto)
    }

    async update(id:string,usersInformationDto:CreateUsersInformationDto){
        const user = await this.usersInformationRepository.findOneOrFail(id);
        if (!user) throw new HttpException('User Not Found', 404);
        return await this.usersInformationRepository.update(id,usersInformationDto)
    }

    async getCustomer(id:string){
        return await this.usersInformationRepository.findOneOrFail(id)
    }

}
