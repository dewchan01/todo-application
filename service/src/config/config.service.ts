import { Injectable } from '@nestjs/common';

export interface IDBConfig {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  DB_TYPE: any;
  DB_DATABASE: string;
  DB_SYNC: boolean;
  DB_LOGGING: boolean;
  DB_RUNMIGRATION?: boolean;
}
@Injectable()
export class ConfigService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private readonly databaseConfig: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private readonly serverConfig: any;

  constructor() {
    const env = 'development';
    this.databaseConfig =
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require('../config/config.json')[env.trim()];
    this.serverConfig =
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require('../config/server.json')[env.trim()];
  }

  public get dbConfig(): IDBConfig {
    return {
      DB_TYPE: this.databaseConfig.type,
      DB_DATABASE: this.databaseConfig.database,
      DB_SYNC: this.databaseConfig.synchronize || false,
      DB_RUNMIGRATION: this.databaseConfig.migrationsRun || false,
      DB_LOGGING: this.databaseConfig.logging || false,
    };
  }

  public get serverPort(): number {
    return Number(this.serverConfig.port || 3201);
  }
}
