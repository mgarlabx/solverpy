import App from './script_app.js';
import Module from './script_module.js';
import Chapter from './script_chapter.js';
import Lesson from './script_lesson.js';

const Chatbot = {

    messageList: [],

    // Initialize the chatbot
    load() {
        // on keypress enter send message
        Z.get('#chatbot-input-text').addEventListener('keypress', event => {
            if (event.key === 'Enter') {
                event.preventDefault();
                Chatbot.send();
            }
        });

    },

    // Show the chatbot
    show() {
        Z.show('#chatbot');
        Z.get('#chatbot-input-text').focus();
    },

    // Hide the chatbot
    hide() {
        Z.hide('#chatbot');
    },

    // Send message
    async send() {
        const messages = Z.get('#chatbot-messages-container').innerHTML;

        // Input message
        const messageInput = Z.getInputText('chatbot-input-text');
        if (!messageInput) return;
        const messageInputHTML = `
            <div class="chatbot-message-input">
                ${messageInput}
            </div>
        `;
        Z.html('#chatbot-messages-container', messages + messageInputHTML);
        Z.get('#chatbot-input-text').value = '';
        Z.get('#chatbot-input-text').focus();
        Chatbot.messageList.push(['user', messageInput]);

        // Output message
        const messageOutput = await Chatbot.submit();
        const messageOutputHTML = `
            <div class="chatbot-message-output">
                ${messageOutput}
            </div>
        `;
        Z.html('#chatbot-messages-container', messages + messageInputHTML + messageOutputHTML);
        Chatbot.messageList.push(['assistant', messageOutput]);

        // Scroll to the bottom of the messages container
        const messagesContainer = Z.get('#chatbot-messages-container');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        Z.get('#chatbot-input-text').focus();

    },

    // Submit the message to the server
    async submit() {

        // Prepare the book content
        let lessons = '';
        Lesson.data.forEach(lesson => {
            lessons += 'Módulo número: ' + lesson.moduleNumber + '\n';
            lessons += 'Capítulo número: ' + lesson.chapterNumber + '\n';
            lessons += 'Aula número: ' + lesson.chapterNumber + '.' + lesson.lessonNumber + '\n';
            lessons += 'Título da aula: ' + lesson.title + '\n';
            lessons += lesson.description + '\n';
            lessons += lesson.video_contents + '\n\n';
        });

        const body = {
            language: 'pt',
            messages: Chatbot.messageList,
            lessons: lessons,
        }
        Z.processing.show();
        let comment = '';
        try {
            const response = await fetch(App.aiPath + 'chatbot', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            const data = await response.json();
            Z.processing.hide();
            comment = data.comment;
            comment = marked.parse(comment); // https://github.com/markedjs/marked
            comment = comment.replace(/<a /g, '<a target="_blank" ');
        } catch (error) {
            Z.processing.hide();
            comment = 'Erro ao enviar a mensagem: ' + error;
        }
        return comment;
    },

    // Clear the messages
    clear() {
        Z.html('#chatbot-messages-container', '');
        Z.get('#chatbot-input-text').value = '';
        Z.get('#chatbot-input-text').focus();
        Chatbot.messageList = [];
    }



}

export default Chatbot;

window.chatbotShow = Chatbot.show;
window.chatbotHide = Chatbot.hide;
window.chatbotSend = Chatbot.send;
window.chatbotClear = Chatbot.clear;