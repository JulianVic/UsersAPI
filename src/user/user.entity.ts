//user.entity.ts
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: "user" })
export class User{
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name: string
    @Column({ unique:true })
    email: string
    @Column()
    password: string
    @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date 
}