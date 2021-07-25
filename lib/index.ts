import { createFs } from '@framework/create-fs.function';

import { FileEntry, DirectoryEntry } from '@types';
import { CreateFsProps, CreateFsOutput } from '@framework/create-fs.types';

export { createFs, FileEntry, DirectoryEntry, CreateFsProps, CreateFsOutput };

const fs = createFs();
export default fs;
