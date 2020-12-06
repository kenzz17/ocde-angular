import { File } from './File';
import { Project } from './Project';
import { ProjectFile } from './ProjectFile';

export const FILES: File[] = [
    { name: '1', body: 'print("1")', lang: 'py'},
    { name: '2', body: 'print("2")', lang: 'py'},
    { name: '3', body: 'print("3")', lang: 'py'},
    { name: '4', body: 'print("4")', lang: 'py'},
    { name: '5', body: 'print("5")', lang: 'py'}
];

export const PROJECTS: string[] = [
    'pro1', 'pro2', 'pro3', 'pro4', 'pro5'
]

const PROJ_FILES: ProjectFile[] = [
    { name: 'alpha', body: 'print("alpha")', lang: 'py', path: 'f1/f2'},
    { name: 'beta', body: 'print("beta")', lang: 'py', path: 'f1'},
    { name: 'gamma', body: 'print("gamma")', lang: 'py', path: 'f1'},
    { name: 'delta', body: 'print("delta")', lang: 'py', path: 'g1'},
    { name: 'epsilon', body: 'print("epsilon")', lang: 'py', path: ''}
];

export const SAMPLE_PROJ: Project = {
    name: 'pro1',
    files: PROJ_FILES
}