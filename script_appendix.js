
const Appendix = {

    content: '',

    load() {
        const tx = [];
        
        tx.push(`<div>`);
        
        tx.push(`Para maximizar seu aprendizado nesse curso:`);
        tx.push(`<ul>`);
        tx.push(`<li>Pratique todos os dias, mesmo que seja por pouco tempo.</li>`);
        tx.push(`<li>Não basta assistir os vídeos, é preciso praticar.</li>`);
        tx.push(`<li>Em cada aula, crie uma pasta e separe os seus códigos.</li>`);
        tx.push(`<li>Altere os códigos, crie seu próprio conteúdo, deixe com a sua cara.</li>`);
        tx.push(`<li>Use o chatbot da Nôva se tiver dúvidas, ela está programado para isso.</li>`);
        tx.push(`</ul>`);

        tx.push(`Complemente seu aprendizado em temas que não foram ensinados no curso:`);
        tx.push(`<ul>`);
        tx.push(`<li>Escopo de variáveis (globais, locais, etc.)</li>`);
        tx.push(`<li>Classes e programação orientada a objetos</li>`);
        tx.push(`<li>Tratamento de erros (try ... catch)</li>`);
        tx.push(`<li>Deploy no Github diretamente do VS Code</li>`);
        tx.push(`<li>Aprofundamento em Pandas</li>`);
        tx.push(`<li>Aprofundamento em Streamlit</li>`);
        tx.push(`</ul>`);

        tx.push(`Onde encontrar mais conteúdo para ler e aprender Python:`);
        tx.push(`<ul>`);
        tx.push(`<li><a href="https://www.solvertank.tech/solverbooks/" target="_blank">Livros de Maurício Garcia</a></li>`);
        tx.push(`<li><a href="https://www.python.org/doc/" target="_blank">Documentação oficial do Python</a></li>`);
        tx.push(`<li><a href="https://www.learnpython.org/" target="_blank">Learn Python</a></li>`);
        tx.push(`<li><a href="https://www.codecademy.com/learn/learn-python-3" target="_blank">Codecademy - Learn Python 3</a></li>`);
        tx.push(`</ul>`);

        tx.push(`Canais do Youtube para seguir e aprender Python:`);
        tx.push(`<ul>`);
        tx.push(`<li><a href="https://www.youtube.com/@mgarlabX" target="_blank">Maurício Garcia</a></li>`);
        tx.push(`<li><a href="https://www.youtube.com/@AsimovAcademy" target="_blank">Asimov Academy</a></li>`);
        tx.push(`<li><a href="https://www.youtube.com/@attekitadev" target="_blank">Attekita Dev</a></li>`);
        tx.push(`<li><a href="https://www.youtube.com/@HashtagProgramacao" target="_blank">Hashtag Programação</a></li>`);
        tx.push(`<li><a href="https://www.youtube.com/@montecarlodigital" target="_blank">Monte Carlo Digital</a></li>`);
        tx.push(`<li><a href="https://www.youtube.com/@programadorpython" target="_blank">Programador Python</a></li>`);
        tx.push(`</ul>`);
        
        tx.push(`</div>`);
        

        Appendix.content = tx.join('');
    },

    show() {
        Z.modal('Dicas, complementos e sugestões', Appendix.content);
        
    },


}

export default Appendix;

window.appendixShow = Appendix.show;