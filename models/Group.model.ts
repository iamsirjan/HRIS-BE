import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { GroupPermission } from "./GroupPermission.model";

@Entity()
export class Group {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  name: string; // e.g., "Admin Group", "Editor Group"

  @OneToMany(
    () => GroupPermission,
    (groupPermission) => groupPermission.group,
    {
      cascade: true,
    }
  )
  permissions: GroupPermission[];
}
