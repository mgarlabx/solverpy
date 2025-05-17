import Module from './script_module.js';
import Chapter from './script_chapter.js';
import Lesson from './script_lesson.js';
import Appendix from './script_appendix.js';

const App = {

    obj: {},

    aiPath: 'https://pw65c2sv6o3ceirszsiikcfejq0cqxjz.lambda-url.us-west-2.on.aws/', // please, change this to your own API.AI endpoint

    async init() {
        this.storageGet();
        Module.data = await this.read('modules');
        Chapter.data = await this.read('chapters');
        Lesson.data = await this.read('lessons');
    },

    async read(fileName) {
        const filePath = `json/${fileName}.json`;
        const response = await fetch(filePath);
        const jsonData = await response.json();
        return jsonData;
    },

    intro() {
        Z.hide('.main-div');
        const tx = []
        tx.push(`<div class="intro-title">Python para iniciantes</div>`);
        tx.push(`<div class="intro-subtitle">Um curso completo e gratuito para começar a programar em Python</div>`);
        let num = 1;
        for (const module of Module.data) {

            const moduleChapters = Chapter.data.filter(item => item.moduleId == module.id);
            const moduleLessons = Lesson.data.filter(item => moduleChapters.map(chapter => chapter.id).includes(item.chapterId));
            const totalLessons = moduleLessons.length;
            const totalConcludedLessons = moduleLessons.filter(item => App.obj.concludedLessons.includes(item.id)).length;

            tx.push(`<div class="module-card" onclick="ModuleShow(${module.id})">`);
            tx.push(`<div class="module-card-title">Módulo ${num}: ${module.title}</div>`);
            tx.push(`<div class="module-card-description">${module.description}</div>`);
            tx.push(`<div class="module-card-thumbs">`);
            tx.push(`<div class="module-card-thumb"><img src="images/thumbs/thumbs${num}a.png" class="module-card-thumb-img"></div>`);
            tx.push(`<div class="module-card-thumb"><img src="images/thumbs/thumbs${num}b.png" class="module-card-thumb-img"></div>`);
            tx.push(`<div class="module-card-thumb"><img src="images/thumbs/thumbs${num}c.png" class="module-card-thumb-img"></div>`);
            tx.push(`<div class="module-card-thumb"><img src="images/thumbs/thumbs${num}d.png" class="module-card-thumb-img"></div>`);
            tx.push(`<div class="module-card-thumb"><img src="images/thumbs/thumbs${num}e.png" class="module-card-thumb-img"></div>`);
            tx.push(`</div>`);
            tx.push(`<div class="module-card-footer">`);
            tx.push(`<div id="module-completion-${module.id}">[${totalConcludedLessons}/${totalLessons}]</div>`);
            tx.push(`</div>`);

            tx.push(`</div>`);
            num++;
        }

        tx.push(`<div class="module-card" onclick="appendixShow()">`);
        tx.push(`<div class="module-card-title">Apêndice</div>`);
        tx.push(`<div class="module-card-description">Dicas, complementos e sugestões para você avançar no seu aprendizado de Python.</div>`);
        tx.push(`</div>`);

        Z.html('#intro', tx.join(''));
        Z.show('#intro');

        // Check if there is a last viewed module, if so, show it
        if (this.obj.lastModule != 0) {
            Module.show(this.obj.lastModule);
        }
    },

    lastView(lastModule, lastChapter) {
        this.obj.lastModule = lastModule;
        this.obj.lastChapter = lastChapter;
        this.storageSet();
    },

    storageGet() {
        const storage = localStorage.getItem('solverpy');
        if (storage === null) {
            this.obj = {
                lastModule: 0,
                lastChapter: 0,
                concludedLessons: [],
            };
            this.storageSet();
        } else {
            this.obj = JSON.parse(storage);
        }
    },

    storageSet() {
        localStorage.setItem('solverpy', JSON.stringify(this.obj));
    },


}

export default App;