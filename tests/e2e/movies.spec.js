// queremos importar o conteudo do arquivo index.js, mas como padrão do js, quando o nome do arquivo for index.js precisa apenas de apontar para o diretorio do arquivo.
const { test, expect } = require('../support');

const data = require('../support/fixtures/movies.json');
const { executeSQL } = require('../support/databese.js');


test('Deve poder cadastrar um novo filme', async ({page}) => {

    const movie = data.a_noite_dos_mortos_vivos;

    await executeSQL("DELETE FROM MOVIES WHERE TITLE = 'A Noite dos Mortos-Vivos';");

    await page.login.do('admin@zombieplus.com', 'pwd123');
    await page.movies.create(movie.title, movie.overview, movie.company, movie.release_year);

    await page.toast.haveText('Cadastro realizado com sucesso!');
});

test('Não deve cadastrar quando os campos obrigatórios não são preenchidos', async ({page}) => {
    await page.login.do('admin@zombieplus.com', 'pwd123');
    await page.movies.goForm();
    await page.movies.submit();

    await page.movies.alertHaveText([
        'Por favor, informe o título.',
        'Por favor, informe a sinopse.',
        'Por favor, informe a empresa distribuidora.',
        'Por favor, informe o ano de lançamento.'
    ]);
})