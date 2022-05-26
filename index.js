let book = '';
let typed = '';
let doneInd = 0;
let currInd = 0;

const viewMap = {
    '\n': 'Enter',
    '\t': 'Tab',
    ' ': 'Space'
};

const keyMap = {
    'Enter': '\n',
    'Tab': '\t',
};

const sourceTxt = document.getElementById('source');
const copiedTxt = document.getElementById('copied');
const bookInput = document.getElementById('book-input');
const keyView = document.getElementById('key-view');

const updateKeyView = () => {
    if(!book || doneInd >= book.length) return;
    let display = book.charAt(doneInd);
    if(display in viewMap){
        display = viewMap[display];
    }
    if(currInd > doneInd){
        display = 'Backspace';
    }
    keyView.innerText = display;
}

bookInput.addEventListener('change', e => {
    if(!e.target.files) return;
    const fr = new FileReader();
    fr.onload = () => {
        book = fr.result;
        book = book.replace(/ \n/g, '\n');
        doneInd = 0;
        currInd = 0;
        sourceTxt.innerText = fr.result;
        copiedTxt.innerText = '';
        updateKeyView();
    }
    fr.readAsText(e.target.files[0]);
});

window.addEventListener('keydown', e => {
    e.preventDefault();
    let key = e.key;
    if(key === 'Backspace'){
        typed = typed.slice(0, -1);
        copiedTxt.innerText = typed;
        currInd--;
        doneInd = Math.min(doneInd, currInd);
        updateKeyView();
        return;
    }
    if(key.length != 1) {
        if(!(key in keyMap)) return;
        key = keyMap[key];
    }
    typed += key;
    copiedTxt.innerText = typed;
    if(currInd === doneInd && key === book.charAt(doneInd)){
        doneInd++;
    }
    currInd++;
    updateKeyView();
});