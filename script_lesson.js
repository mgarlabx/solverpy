import App from './script_app.js';
import Chapter from './script_chapter.js';

const Lesson = {

    check(id) {
        
        // Get module and chapter id of the lesson
        const lesson = Lesson.data.filter(item => item.id == id)[0];
        const chapter = Chapter.data.filter(item => item.id == lesson.chapterId)[0];
        const chapterId = chapter.id;
        const moduleId = chapter.moduleId;

        // Get chapter status
        const chapterStatus = Z.get(`module-chapter-completion-${chapterId}`).innerHTML;
        let totalConcludedChapterLessons = chapterStatus.split('/')[0].replace('[', '');
        const totalChapterLessons = chapterStatus.split('/')[1].replace(']', '');

        // Get module status
        const moduleStatus = Z.get(`module-completion-${moduleId}`).innerHTML;
        let totalConcludedModuleLessons = moduleStatus.split('/')[0].replace('[', '');
        const totalModuleLessons = moduleStatus.split('/')[1].replace(']', '');
        
          
        // Save id of concluded lessons in local storage
        const chk = Z.getInputCheckbox(`lesson-check-${id}`);
        if (chk) {
            if (!App.obj.concludedLessons.includes(id)) {
                App.obj.concludedLessons.push(id);
                totalConcludedChapterLessons++;
                totalConcludedModuleLessons++;
            }
        } else {
            const index = App.obj.concludedLessons.indexOf(id);
            if (index > -1) {
                App.obj.concludedLessons.splice(index, 1);
                totalConcludedChapterLessons--;
                totalConcludedModuleLessons--;
            }
        }

        // Update module and chapter status
        Z.html(`#module-chapter-completion-${chapterId}`, `[${totalConcludedChapterLessons}/${totalChapterLessons}]`);
        Z.html(`#module-completion-${moduleId}`, `[${totalConcludedModuleLessons}/${totalModuleLessons}]`);

        // Save local storage
        App.storageSet();
        
    }


}

export default Lesson;

window.lessonCheck = Lesson.check;