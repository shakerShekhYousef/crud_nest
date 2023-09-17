import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Blog } from "./entities/blog.entity";
import { BlogService } from "./services/blog.service";
import { BlogController } from "./controllers/blog.controller";
import { HelpersModule } from "./../../helpers/helpers.module";
import { BlogRepository } from "@src/app/repositories";

const modules = [HelpersModule];

@Module({
  imports: [TypeOrmModule.forFeature([Blog]), ...modules],
  providers: [BlogService, BlogRepository],
  exports: [BlogService],
  controllers: [BlogController],
})
export class BlogModule {}
