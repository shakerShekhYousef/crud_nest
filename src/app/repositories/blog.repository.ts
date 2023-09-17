import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Blog } from "../modules/post/entities/blog.entity";
import { CreateBlogDto } from "../modules/post/dtos";
import { User } from "../modules/user/entities/user.entity";
import { FileHelper } from "../helpers";

@Injectable()
export class BlogRepository extends Repository<Blog> {
  constructor(private dataSource: DataSource, private fileHelper: FileHelper) {
    super(Blog, dataSource.createEntityManager());
  }

  async createNewBlog(
    body: CreateBlogDto,
    file: Express.Multer.File,
    user: User
  ): Promise<Blog> {
    //store the file
    let image_url = await this.fileHelper.store(file);
    //insert into body object
    body.img_url = image_url;
    //insert user
    body.user = user;
    body.userId = user.id;
    //insert data
    let blog = await this.save(body);

    return blog;
  }
}
