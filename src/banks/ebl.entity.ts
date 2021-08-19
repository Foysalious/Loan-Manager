import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

@Entity('ebl')
export class EblEntity {
    @ObjectIdColumn() id: ObjectID;
    @Column()status:number
    @Column()customer_id:string
}
