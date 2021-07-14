import { createFS } from './createFS.function';

const fs = createFS({ databaseName: 'test-db-4' });

fs.writeFile('test.txt', 'test');
