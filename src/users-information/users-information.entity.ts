import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

@Entity('users-information')
export class UsersInformationEntity {
    @ObjectIdColumn() id: ObjectID;
    @Column()name:string
    @Column()present_address:string
    @Column()division:string
    @Column() district:string
    @Column()thana:string
    @Column() gender:string
    @Column()dob:string
    @Column()marital_status:string
    @Column()identity_type:string
    @Column()employment_type:string
    @Column()monthly_income:string
    @Column()educational_qualification:string
    @Column()educational_institute_name:string
    @Column()company_name:string
    @Column()company_address:string
    @Column() company_division:string
    @Column()company_district:string
    @Column()company_thana:string
    @Column()employment_proff:string
    @Column()employment_proff_image:string
    @Column()outstanding_loan:string
    @Column()photo:string
    @Column()nid_front_side:string
    @Column()nid_back_side:string
    @Column()salary_certificate:string
    @Column()bank_statement:string
    @Column()utility_bill:string
    @Column()contact_person_relation:string
    @Column()contact_person_name:string
    @Column()contact_person_number:string
    @Column() additional_document_1:string
    @Column()additional_document_2:string
}
