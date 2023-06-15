import { DataSource, DataSourceOptions } from 'typeorm';
const dataSourceOptions: DataSourceOptions =
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('../../config/config.json')['development'];

// this file is only for cli migration utils
export default new DataSource(dataSourceOptions);
