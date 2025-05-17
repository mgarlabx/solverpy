import App from './script_app.js';
import Editor from './script_editor.js';
import Chatbot from './script_chatbot.js'
import Appendix from './script_appendix.js';

Z.ready(() => {

    const appName = 'solverpy';
    
    Z.terms(appName, 'pt', async res => {
        if (res === false) {
            Z.termsError('pt');
            return;
        } else {
            await App.init();
            App.intro();
            Editor.load();
            Chatbot.load();
            Appendix.load();
            Z.recordAccess(appName);
        }
    });

})