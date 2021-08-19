import {HttpModule, Module} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { User } from './users/user.entity';
import {UsersService} from "./users/users.service";
import {JwtModule} from "@nestjs/jwt";
import {UserInformationService} from "./users-information/users_information.service";
import { CatsController } from './cats/cats.controller';
import {UsersInformationEntity} from "./users-information/users-information.entity";
import {UsersInformationRepository} from "./users-information/users-information.repository";

@Module({
  imports: [JwtModule.register({
    secret: 'topsecret51',
    signOptions: {
      expiresIn: 3000,
    },
  }),HttpModule.register({timeout:5000,maxRedirects:5}),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false",
      database: "nest",
      entities: [
        __dirname + '/**/*.entity{.ts,.js}',
      ],
   
      useUnifiedTopology: true,
      useNewUrlParser: true
    }),
    TypeOrmModule.forFeature([User,UsersInformationRepository])
  ],
  controllers: [AppController, UsersController,],
  providers: [AppService,UsersService,HttpModule,UserInformationService],
})
export class AppModule {}
