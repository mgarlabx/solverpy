import App from './script_app.js';
import Lesson from './script_lesson.js';

const Chapter = {

    data: {},
    index: 0,
    current: {},
    nextId: 0,
    previousId: 0,
    lessons: [],
    players: [],

    nav(op) {
        if (op == 0) {
            if (Chapter.previousId != 0) Chapter.show(Chapter.previousId);
        } else if (op == 1) {
            if (Chapter.nextId != 0) Chapter.show(Chapter.nextId);
        }
    },

    show(id) {
        App.lastView(App.obj.lastModule, id); // Update last viewed chapter

        Chapter.index = Chapter.data.findIndex(item => item.id == id);
        Chapter.current = Chapter.data.filter(item => item.id == id)[0];

        Chapter.previousId = 0;
        if (Chapter.index > 0) {
            const chapterPrevious = Chapter.data[Chapter.index - 1];
            if (chapterPrevious.moduleId == Chapter.current.moduleId) Chapter.previousId = chapterPrevious.id;
        }

        Chapter.nextId = 0;
        if (Chapter.index < Chapter.data.length - 1) {
            const chapterNext = Chapter.data[Chapter.index + 1];
            if (chapterNext.moduleId == Chapter.current.moduleId) Chapter.nextId = chapterNext.id;
        }

        Chapter.lessons = Lesson.data.filter(item => item.chapterId == id);

        Z.removeClass('.module-chapter', 'module-chapter-selected');
        Z.addClass(`#module-chapter-${id}`, 'module-chapter-selected');

        const tx = []

        for (const lesson of Chapter.lessons) {
            const num = lesson.chapterNumber + '.' + lesson.lessonNumber;

            let footer = lesson.footer ? lesson.footer : '';
            footer = footer.replace('[[[EDITOR]]]', '<div class="app-inline-link" onclick="editorShow()">AQUI</div>');

            let checked = '';
            if (App.obj.concludedLessons.includes(lesson.id)) {
                checked = 'checked';
            }

            tx.push(`<div class="lesson">`);
            tx.push(`<div class="lesson-check"><span style="font-size:0.7rem;">Concluída</span> <input type="checkbox" ${checked} id="lesson-check-${lesson.id}" onclick="lessonCheck(${lesson.id})"></div>`);
            tx.push(`<div class="lesson-number">Aula ${num}</div>`);
            tx.push(`<div class="lesson-title">${lesson.title}</div>`);
            tx.push(`<div class="lesson-description">${lesson.description}</div>`);
            tx.push(`<div class="lesson-video">`);

            if (lesson.youtube_id.length > 5) {
                tx.push(`<div class="lesson-youtube-responsive">`);
                tx.push(`<iframe class="lesson-youtube-iframe" src="https://www.youtube.com/embed/${lesson.youtube_id}?enablejsapi=1" frameborder="0" allowfullscreen></iframe>`);
                tx.push(`</div>`);
            } else {
                // Deprecated - use youtube_id instead
                tx.push(`<video controls class="lesson-video-responsive">`);
                tx.push(`<source src="${'video/' + lesson.file}" type="video/mp4" />`);
                tx.push(`</video>`);
            }

            tx.push(`</div>`);
            //tx.push(`<div class="lesson-file">${lesson.file}</div>`); // debug
            tx.push(`<div class="lesson-footer">${footer}</div>`);
            tx.push(`</div>`);
        }
        tx.push(`<div class="chapter-navs">`);
        tx.push(`<div class="chapter-nav" onclick="ChapterNav(0)" style="visibility:${Chapter.previousId == 0 ? 'hidden' : 'visible'}"><< Capítulo anterior</div>`);
        tx.push(`<div class="chapter-nav" onclick="ChapterNav(1)" style="visibility:${Chapter.nextId == 0 ? 'hidden' : 'visible'}">Próximo capítulo >></div>`);
        tx.push(`</div>`);

        Z.html('#chapter-lessons', tx.join(''));
        window.scrollTo(0, 0);

        // Interrupt video playback when another video is played
        const videos = document.querySelectorAll('video.lesson-video-responsive');
        videos.forEach(video => {
            video.addEventListener('play', () => {
                videos.forEach(otherVideo => {
                    if (otherVideo !== video) {
                        otherVideo.pause();
                    }
                });
            });
        });

        // Interrupt youtube playback when another video is played
        Chapter.players = []; 
        const iframes = document.querySelectorAll('iframe.lesson-youtube-iframe');
        iframes.forEach(iframe => {
            const player = new YT.Player(iframe, {
                events: {
                    onStateChange: Chapter.handleStateChange
                }
            });
            Chapter.players.push(player);
        });

    },

    handleStateChange(event) {
        if (event.data === YT.PlayerState.PLAYING) {
            Chapter.players.forEach(video => {
                if (video !== event.target) {
                    video.pauseVideo();
                }
            });
        }
    }
}

export default Chapter;

window.ChapterShow = Chapter.show;
window.ChapterNav = Chapter.nav;
