import { ProjectFile } from './ProjectFile';

export interface Project {
    name: string;
    files: ProjectFile[];
}