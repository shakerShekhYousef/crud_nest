import { BaseEntity } from "@src/app/base";
import { Column, Entity, ManyToOne, RelationId } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { Type } from "class-transformer";
import { ENUM_TABLE_NAMES } from "@src/shared";

@Entity(ENUM_TABLE_NAMES.BLOG, { orderBy: { createdAt: "DESC" } })
export class Blog extends BaseEntity {
  public static readonly SEARCH_TERMS: string[] = ["title"];

  @Column()
  title?: string;

  @Column()
  description?: string;

  @ManyToOne((t) => User, { onDelete: "NO ACTION" })
  @Type((t) => User)
  user?: User;

  @RelationId((e: Blog) => e.user)
  userId?: string;

  @Column()
  img_url?: string;
 

  constructor() {
    super();
  }
}
