import path from 'path';

const DEMO_FOLDER = path.join(__dirname, '..', 'src/');
export const CONSTANTS = {
  APP_ENTRY: path.join(DEMO_FOLDER, 'index.tsx'),
  HTML_TEMPLATE: path.join(__dirname, 'index.html'),
  DOCS_DIR: path.join(__dirname, '..', 'docs/'),
  DEV_SERVER_PORT: 8092,
  PUBLIC_PATH: '/public/',
};
