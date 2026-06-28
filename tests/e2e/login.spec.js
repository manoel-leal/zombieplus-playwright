const { test, expect } = require('@playwright/test');
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

test('Deve realizar login como administrador', async ({page}) => {
    await loginPage.visit();
    await loginPage.submit('admin@zombieplus.com', 'pwd123');
    await moviesPage.isLoggedIn();

});

test('Não deve realizar login com senha inválida', async ({page}) => {
    const message = 'Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'
    
    await loginPage.visit();
    await loginPage.submit('admin@zombieplus.com', 'abc123');
    await toast.haveText(message)

});

test('Não deve realizar login sem preencher o e-mail', async ({page}) => {
    await loginPage.visit();
    await loginPage.submit('', 'abc123');
    await loginPage.alertEmailHaveText('Campo obrigatório');

});

test('Não deve realizar login sem preencher a senha', async ({page}) => {
    await loginPage.visit();
    await loginPage.submit('admin@zombieplus.com', '');
    await loginPage.alertPasswordHaveText('Campo obrigatório');

});

test('Não deve realizar login com e-mail incorreto', async ({page}) => {
    await loginPage.visit();
    await loginPage.submit('zombieplus.com', 'pwd123');
    await loginPage.alertEmailHaveText('Email incorreto');

});