import {
  Entity,
  Column,
  OneToOne,
  ManyToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { base } from "./Base.model";
import { MediaType } from "../enum/media.enum";
import { User } from "./User.model";

@Entity("t_medias")
export class Media extends base {
  @Column({ type: "enum", enum: MediaType })
  type: MediaType;

  @Column({ type: "varchar", length: 300 })
  url: string;

  @OneToOne(() => User, (user) => user.media, { nullable: true })
  user: User;
}
