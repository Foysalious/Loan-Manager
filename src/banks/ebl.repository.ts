import {EntityRepository, Repository} from "typeorm";
import {EblEntity} from "./ebl.entity";

@EntityRepository(EblEntity)
export class EblRepository extends Repository<EblEntity>{
}
