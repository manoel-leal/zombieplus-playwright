const { test, expect } = require('../support');


test('Deve realizar login como administrador', async ({page}) => {
    await page.login.visit();
    await page.login.submit('admin@zombieplus.com', 'pwd123');
    await page.login.isLoggedIn();

});

test('Não deve realizar login com senha inválida', async ({page}) => {
    const message = 'Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'
    
    await page.login.visit();
    await page.login.submit('admin@zombieplus.com', 'abc123');
    await page.toast.haveText(message)

});

test('Não deve realizar login sem preencher o e-mail', async ({page}) => {
    await page.login.visit();
    await page.login.submit('', 'abc123');
    await page.login.alertEmailHaveText('Campo obrigatório');

});

test('Não deve realizar login sem preencher a senha', async ({page}) => {
    await page.login.visit();
    await page.login.submit('admin@zombieplus.com', '');
    await page.login.alertPasswordHaveText('Campo obrigatório');

});

test('Não deve realizar login com e-mail incorreto', async ({page}) => {
    await page.login.visit();
    await page.login.submit('zombieplus.com', 'pwd123');
    await page.login.alertEmailHaveText('Email incorreto');

});