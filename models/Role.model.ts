import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";

import { Group } from "./Group.model";

@Entity()
export class Role {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Group, { cascade: true })
  @JoinTable({
    name: "role_groups", // Junction table
    joinColumn: { name: "role_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "group_id", referencedColumnName: "id" },
  })
  groups: Group[];
}
