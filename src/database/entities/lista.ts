import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('Lista')
export class Lista{
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    item: string

    @Column()
    preco: number
}