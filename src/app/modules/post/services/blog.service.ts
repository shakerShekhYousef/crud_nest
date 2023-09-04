import { BaseService } from "@src/app/base";
import { Blog } from "../entities/blog.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

export class BlogService extends BaseService<Blog>{
    constructor(
        @InjectRepository(Blog) 
        private readonly _repo: Repository<Blog>
    ){
        super(_repo)
    }
}