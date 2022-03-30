import {saveAs} from 'file-saver';

export const save = (d) => {
    const blob = new Blob([JSON.stringify(d)], {type: "text/plain;charset=utf-8"});
    saveAs(blob);
}

export const load = () => new Promise(resolve => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = () => {
        const file = input.files[0];
        const fr = new FileReader();
        fr.onload = () => resolve(JSON.parse(fr.result));
        fr.readAsText(file);
    }
    input.click();
})
