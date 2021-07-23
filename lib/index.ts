import { FileEntry, DirectoryEntry } from '@types';
import { createFs, CreateFsProps, CreateFsOutput } from '@framework';

export { createFs, FileEntry, DirectoryEntry, CreateFsProps, CreateFsOutput };

const fs = createFs();
export default fs;
