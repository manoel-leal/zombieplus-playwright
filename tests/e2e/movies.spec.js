const { test, expect } = require('@playwright/test');

const data = require('../support/fixtures/movies.json');
const { executeSQL } = require('../support/databese.js');

const {LoginPage} = require('../pages/LoginPage.js');
const { Toast } = require('../pages/Components.js');
const { MoviesPage } = require('../pages/MoviesPage.js');

let loginPage;
let toast;
let moviesPage;

test.beforeEach(async ({page}) => {
    loginPage = new LoginPage(page);
    toast = new Toast(page);
    moviesPage = new MoviesPage(page);
})

test('Deve poder cadastrar um novo filme', async ({page}) => {

    const movie = data.a_noite_dos_mortos_vivos;

    await executeSQL("DELETE FROM MOVIES WHERE TITLE = 'A Noite dos Mortos-Vivos';");

    await loginPage.visit();
    await loginPage.submit('admin@zombieplus.com', 'pwd123');
    await moviesPage.isLoggedIn();
    await moviesPage.create(movie.title, movie.overview, movie.company, movie.release_year);

    await toast.haveText('Cadastro realizado com sucesso!');
});