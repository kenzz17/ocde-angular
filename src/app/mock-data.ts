import { File } from './File';
import { ProjectFile } from './ProjectFile';

export const FILES: File[] = [
    { name: '1.py', body: 'print("1")', lang: 'py'},
    { name: '2.py', body: 'print("2")', lang: 'py'},
    { name: '3.py', body: 'print("3")', lang: 'py'},
    { name: '4.py', body: 'print("4")', lang: 'py'},
    { name: '5.py', body: 'print("5")', lang: 'py'}
];

export const PROJECTS: string[] = [
    'pro1', 'pro2', 'pro3', 'pro4', 'pro5'
]

export const SAMPLE_PROJ: ProjectFile[] = [
    { name: 'alpha.py', body: 'print("alpha")', lang: 'py', path: 'f1/f2'},
    { name: 'beta.py', body: 'print("beta")', lang: 'py', path: 'f1'},
    { name: 'gamma.py', body: 'print("gamma")', lang: 'py', path: 'f1'},
    { name: 'delta.py', body: 'print("delta")', lang: 'py', path: 'g1'},
    { name: 'epsilon.py', body: 'print("epsilon")', lang: 'py', path: ''}
];