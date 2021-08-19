import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";


@EntityRepository(User)
export class UsersRepository extends Repository<User>{
    async findUserByMobile(mobile: string) {
        return await this.findOne({
            where: {
                mobile: mobile,
            },
        });
    }


}
