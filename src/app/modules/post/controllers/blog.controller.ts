import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { BlogService } from "../services/blog.service";
import { SuccessResponse } from "@src/app/types";
import { CreateBlogDto, FilterBlogDTO, UpdateBlogDTO } from "../dtos";
import { Blog } from "../entities/blog.entity";
import { AuthGuard } from "@nestjs/passport";
import { AuthUser } from "@src/app/decorators";

@ApiTags("Blog")
@ApiBearerAuth()
@Controller("blogs")
export class blogController {
  RELATIONS = ["user"];
  constructor(private readonly service: BlogService) {}

  @Get()
  async findAll(
    @Query() query: FilterBlogDTO
  ): Promise<SuccessResponse | Blog[]> {
    return this.service.findAllBase(query, { relations: this.RELATIONS });
  }
  @Get(":id")
  async findById(@Param("id") id: string): Promise<Blog> {
    return this.service.findByIdBase(id, { relations: this.RELATIONS });
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createOne(
    @Body() body: CreateBlogDto,
    @AuthUser() user
  ): Promise<Blog> {
    body.userId = user.id;
    body.user = user;
    return this.service.createOneBase(body, { relations: this.RELATIONS });
  }

  //   @Post('recover/:id')
  //   async recoverById(@Param('id') id: string): Promise<Permission> {
  //     return this.service.recoverByIdBase(id, { relations: this.RELATIONS });
  //   }

  @Patch(":id")
  async updateOne(
    @Param("id") id: string,
    @Body() body: UpdateBlogDTO
  ): Promise<Blog> {
    return this.service.updateOneBase(id, body, { relations: this.RELATIONS });
  }

  @Delete(":id")
  async deleteOne(@Param("id") id: string): Promise<SuccessResponse> {
    return this.service.deleteOneBase(id);
  }

  //   @Delete('soft/:id')
  //   async softDeleteOne(@Param('id') id: string): Promise<SuccessResponse> {
  //     return this.service.softDeleteOneBase(id);
  //   }
}
