import App from './script_app.js';

const Editor = {

    // https://codemirror.net/
    // https://pyodide.org/

    obj: null,
    pyodide: null,
    loaded: false,

    async load() {
        Editor.pyodide = await loadPyodide();
        console.log = message => Z.get('#editor-console').innerHTML += message + '<br>'; // run first time
        Z.get('#editor-button-container').style.visibility = 'visible';
        Z.get('#editor-code-container').style.visibility = 'visible';
        Z.get('#editor-console-container').style.visibility = 'visible';
    },

    async run() {

        let code = Editor.obj.getValue();
        Z.html('#editor-console', '');
        try {
            await Editor.pyodide.runPythonAsync(code);
        } catch (error) {
            const messages = error.message.split(',');
            const lastMessage = messages[messages.length - 1];
            console.log(lastMessage);
        }
        console.log = message => Z.get('#editor-console').innerHTML += message + '<br>';
    },

    async clear() {
        Z.html('#editor-console', '');
        Z.get('#editor-code').value = '';
        Z.get('#editor-code').innerHTML = '';
        Editor.obj.setValue('');
        Editor.pyodide = await loadPyodide();
    },

    hide() {
        Z.hide('#editor');
    },

    show() {
        Z.show('#editor');
        if (!Editor.loaded) {
            Editor.loaded = true;
            Editor.obj = CodeMirror.fromTextArea(Z.get('#editor-code'), {
                lineNumbers: true,
                mode: "python",
                theme: "darcula",
            });
        }
    },

    help() {
        const body = {
            language: 'pt',
            code: Editor.obj.getValue(),
            console: Z.get('#editor-console').textContent
        }
        Z.processing.show();
        fetch(App.aiPath + 'support', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(response => response.json()).then(data => {
            Z.processing.hide();
            let comment = data.comment;
            comment = marked.parse(comment); // https://github.com/markedjs/marked
            comment = comment.replace(/<a /g, '<a target="_blank" ');
            Z.modal('Ajuda da Nôva', comment);
        });

    }

};

window.editorRun = Editor.run;
window.editorClear = Editor.clear;
window.editorHide = Editor.hide;
window.editorShow = Editor.show;
window.editorHelp = Editor.help;

export default Editor;