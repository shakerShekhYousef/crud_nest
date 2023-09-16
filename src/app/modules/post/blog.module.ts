import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Blog } from "./entities/blog.entity";
import { BlogService } from "./services/blog.service";
import { blogController } from "./controllers/blog.controller";
import { HelpersModule } from "./../../helpers/helpers.module";

const modules = [HelpersModule];

@Module({
  imports: [TypeOrmModule.forFeature([Blog]),...modules],
  providers: [BlogService],
  exports: [BlogService],
  controllers: [blogController],
})
export class BlogModule {}
