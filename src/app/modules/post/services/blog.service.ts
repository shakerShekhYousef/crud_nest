import { BaseService } from "@src/app/base";
import { Blog } from "../entities/blog.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { BlogRepository } from "@src/app/repositories";
import { CreateBlogDto } from "../dtos";
import { User } from "../../user/entities/user.entity";
import { IFindByIdBaseOptions } from "@src/app/interfaces";

export class BlogService extends BaseService<Blog> {
  constructor(
    @InjectRepository(BlogRepository)
    private readonly _repo: BlogRepository
  ) {
    super(_repo);
  }
  
  async createOneWithFile(
    data: CreateBlogDto,
    file: Express.Multer.File,
    user: User,
    options?: IFindByIdBaseOptions
  ): Promise<Blog> {
    const created = await this._repo.createNewBlog(data,file,user)
    return await this.findByIdBase(created.id, options);
  }
}
