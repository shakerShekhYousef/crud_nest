import { CacheModule, Module } from "@nestjs/common";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { ServeStaticModule } from "@nestjs/serve-static";
import { DatabaseModule } from "@src/database/database.module";
import { join } from "path";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ExceptionFilter } from "./filters";
import { HelpersModule } from "./helpers/helpers.module";
import { ResponseInterceptor } from "./interceptors/response.interceptor";
import { AuthModule } from "./modules/auth/auth.module";
import { UserModule } from "./modules/user/user.module";
import { BlogModule } from "./modules/post/blog.module";
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";

const MODULES = [
  CacheModule.register({
    isGlobal: true,
  }),
  DatabaseModule,
  HelpersModule,
  AuthModule,
  UserModule,
  BlogModule,
  MulterModule.register({
    storage: diskStorage({
      destination: "./public/uploads",
      filename: (req, file, callback) => {
        // Customize the filename if needed
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        callback(null, file.fieldname + "-" + uniqueSuffix);
      },
    }),
  }),
];
@Module({
  imports: [...MODULES],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: ExceptionFilter,
    },

    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
