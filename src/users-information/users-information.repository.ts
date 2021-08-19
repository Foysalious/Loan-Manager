import {UsersInformationEntity} from "./users-information.entity";
import {EntityRepository, Repository} from "typeorm";

@EntityRepository(UsersInformationEntity)
export class UsersInformationRepository extends Repository<UsersInformationEntity>{
}
