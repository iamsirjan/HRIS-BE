import {
  Entity,
  Column,
  OneToMany,
  JoinColumn,
  OneToOne,
  ManyToOne,
} from "typeorm";
import { base } from "./Base.model";
import { BloodGroup, Department, Designation, Gender } from "../enum/user.enum";
import { Media } from "./Media.model";
import { Role } from "./Role.model";

@Entity()
export class User extends base {
  @Column()
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: false, type: "text" })
  phoneNumber: string;

  @Column({ nullable: true, type: "text" })
  emergencyNumber: string;

  @OneToOne(() => Media, (media) => media.user, { nullable: true })
  @JoinColumn({ name: "media_id" })
  media: Media;

  @Column({ name: "media_id", nullable: true })
  mediaId: string;

  @Column()
  onboard_date: Date;

  @Column({ nullable: true })
  resetToken: string;

  @ManyToOne(() => Role, { eager: true })
  role: Role;

  @Column({
    type: "enum",
    enum: Gender,
    nullable: true,
  })
  gender: Gender;

  @Column({
    type: "enum",
    enum: BloodGroup,
    nullable: true,
  })
  bloodGroup: BloodGroup;

  @Column({
    type: "enum",
    enum: Designation,
    nullable: true,
  })
  designation: Designation;

  @Column({
    type: "enum",
    enum: Department,
    nullable: true,
  })
  department: Department;
}
