import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, DynamicModule } from '@nestjs/common';
import { ConfigModule } from '../../config/config.module';
import { ConfigService } from '../../config/config.service';

function databaseModule(): DynamicModule {
  return TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (config: ConfigService) => {
      return {
        type: config.dbConfig.DB_TYPE,
        database: config.dbConfig.DB_DATABASE,
        synchronize: config.dbConfig.DB_SYNC,
        logging: config.dbConfig.DB_LOGGING,
        migrationsRun: config.dbConfig.DB_RUNMIGRATION,
        entities: ['dist/**/**.entity{.ts,.js}', 'src/**/**.entity{.ts,.js}'],
        cli: {
          migrationsDir: 'migration',
        },
      };
    },
  });
}

@Module({
  imports: [databaseModule()],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
