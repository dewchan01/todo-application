import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from './config/config.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import { AllExceptionsFilter } from './todos/all-exceptions-filter';

async function bootstrap(): Promise<number | undefined> {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const argv = require('minimist')(process.argv.slice(2));
  const openApiOutputFile = argv.openApiOutputFile as string | undefined;
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  });
  if (openApiOutputFile) {
    // Generate the openApi JSON output file and exit
    await initializeSwagger(app, openApiOutputFile);
    return undefined;
  }
  // start up the service
  app.enableCors();
  // globally scoped custom exception filter.  Can also scope at the controller or method levels
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe());
  await app.startAllMicroservices();
  await initializeSwagger(app);
  const portNumber = app.get(ConfigService).serverPort;
  await app.listen(portNumber);
  return portNumber;
}
async function initializeSwagger(
  app: INestApplication,
  openApiOutputFile?: string,
): Promise<void> {
  const options = new DocumentBuilder()
    .setTitle('Todo App Service OpenAPI')
    .setDescription(
      'An example service that provides sample routes and behaviors, for interacting with the Todo App UI',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  if (openApiOutputFile) {
    console.log(`Generating OpenApi document file: ${openApiOutputFile}`);
    fs.writeFileSync(openApiOutputFile, JSON.stringify(document));
  } else {
    SwaggerModule.setup('api', app, document);
  }
}

bootstrap()
  .then((portNumber: number | undefined): void => {
    if (portNumber) {
      console.log(`Service started, listening on port ${portNumber}`);
    }
  })
  .catch((err: Error): void => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    console.log(`Error bootstrapping:  ${err}`);
  });
