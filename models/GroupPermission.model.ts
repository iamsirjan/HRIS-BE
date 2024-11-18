import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Group } from "./Group.model";
import { Module, Permission } from "../enum/user.enum";

@Entity()
export class GroupPermission {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Group, (group) => group.permissions, {
    onDelete: "CASCADE",
  })
  group: Group;

  @Column({
    type: "enum",
    enum: Module,
  })
  module: Module;

  @Column({
    type: "enum",
    enum: Permission,
  })
  actions: Permission[];
}
