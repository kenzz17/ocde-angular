import { File } from './File';
import { ProjectFile } from './ProjectFile';

export const SAMPLE_FILE: File = {
    body: "print(1)",
    lang: "py"
};

export const FILES: {names: string[]} = {
    names:['1.py','2.py','3.py','4.py','5.py']
}

export const PROJECTS: {status:string, projectlist: string[]} = {
    status: 'success',
    projectlist:['pro1', 'pro2', 'pro3', 'pro4', 'pro5']
}

export const SAMPLE_PROJ: {status:string, data:ProjectFile[]} = {
    status: 'success',
    data: [
        { name: 'alpha.py', body: 'print("alpha")', lang: 'py', path: 'f1/f2'},
        { name: 'beta.py', body: 'print("beta")', lang: 'py', path: 'f1'},
        { name: 'gamma.py', body: 'print("gamma")', lang: 'py', path: 'f1'},
        { name: 'delta.py', body: 'print("delta")', lang: 'py', path: 'g1'},
        { name: 'epsilon.py', body: 'print("epsilon")', lang: 'py', path: ''}
    ]
};