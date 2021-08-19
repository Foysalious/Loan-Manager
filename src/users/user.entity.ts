import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @ObjectIdColumn() id: ObjectID;
  @Column() mobile: string;
  @Column() pin: string;
  @Column() user_type: string;



}
