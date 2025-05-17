import App from './script_app.js';
import Chapter from './script_chapter.js';
import Lesson from './script_lesson.js';

const Module = {

    data: {},

    current: {},

    chapters: [],

    show(id) {

        // Update last viewed module if different
        if (App.obj.lastModule != id) {
            App.lastView(id, 0);
        }

        Module.current = Module.data.filter(item => item.id == id)[0];
        Module.chapters = Chapter.data.filter(item => item.moduleId == id);
        Z.hide('.main-div');
        const tx = []
        tx.push(`<div class="module-header">`);
        tx.push(`<div class="module-header-title">${Module.current.title}</div>`);
        tx.push(`<div class="module-header-button" onclick="ModuleHide()">X</div>`);
        tx.push(`</div>`);
        tx.push(`<div class="module-chapters">`);
        for (const chapter of Module.chapters) {
            const chapterLessons = Lesson.data.filter(item => item.chapterId == chapter.id);
            const totalLessons = chapterLessons.length;
            const totalConcludedLessons = chapterLessons.filter(item => App.obj.concludedLessons.includes(item.id)).length;
            tx.push(`<div class="module-chapter" id="module-chapter-${chapter.id}" onclick="ChapterShow(${chapter.id})">`);
            tx.push(`<div class="module-chapter-title">${chapter.title}</div>`);
            tx.push(`<div id="module-chapter-completion-${chapter.id}">[${totalConcludedLessons}/${totalLessons}]</div>`);
            tx.push(`</div>`);
        }
        tx.push(`</div>`);
        tx.push(`<div id="chapter-lessons"></div>`);
        Z.html('#module', tx.join(''));
        Z.show('#module');

        // Show chapter (last viewed or first)
        if (Module.chapters.length > 0) {
            if (App.obj.lastChapter != 0) {
                Chapter.show(App.obj.lastChapter);
            } else {
                Chapter.show(Module.chapters[0].id);
            }
        }

    },

    hide() {
        // Interrupt video playback if running
        const videos = document.querySelectorAll('video.lesson-video-responsive');
        videos.forEach(video => video.pause());
        // Interrupt youtube playback when another video is played
        Chapter.players.forEach(video => video.pauseVideo());

        App.lastView(0, 0);
        Z.hide('.main-div');
        Z.show('#intro');
    },

}

export default Module;

window.ModuleShow = Module.show;
window.ModuleHide = Module.hide;

