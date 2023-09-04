import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Blog } from "./entities/blog.entity";
import { BlogService } from "./services/blog.service";
import { blogController } from "./controllers/blog.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Blog])],
    providers: [BlogService],
    exports: [BlogService],
    controllers: [blogController],
  })
  export class BlogModule {}