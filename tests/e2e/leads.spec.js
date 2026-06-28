const { test, expect } = require('@playwright/test');
const { LandingPage } = require('../pages/LandingPage.js');
const { Toast } = require('../pages/Components.js');
const { faker } = require('@faker-js/faker');

let landingPage;
let toast;

test.beforeEach(async({page}) => {
  landingPage = new LandingPage(page);
  toast = new Toast(page)
});


test('deve cadastrar um lead na fila de espera', async ({ page }) => {
  const message = "Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!";
  const randomName = faker.person.fullName();
  const randomEmail = faker.internet.email();

  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm(randomName, randomEmail);
  await toast.haveText(message);

});

test('Não deve cadastrar um lead com um e-mail já cadastrado', async ({ page, request }) => {
  const message = "O endereço de e-mail fornecido já está registrado em nossa fila de espera.";
  const randomName = faker.person.fullName();
  const randomEmail = faker.internet.email();

  const newLead = await request.post('http://localhost:3333/leads', {
    data: {
      name: randomName,
      email: randomEmail
    }
  });

  expect(newLead.ok).toBeTruthy();

  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm(randomName, randomEmail);
  await toast.haveText(message);

});

test('não deve cadastrar com e-mail inválido', async ({ page }) => {
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm('Pessoa teste', 'test.com');
  await landingPage.alertHaveText('Email incorreto');

});

test('não deve cadastrar quando o nome não é preenchido', async ({ page }) => {
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm('', 'pessoa@test.com');
  await landingPage.alertHaveText('Campo obrigatório');

});

test('não deve cadastrar quando o e-mail não é preenchido', async ({ page }) => {
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm('Pessoa teste', '');
  await landingPage.alertHaveText('Campo obrigatório');


});

test('não deve cadastrar quando nenhum campo é preenchido', async ({ page }) => {
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm('', '');
  await landingPage.alertHaveText([
    'Campo obrigatório', 
    'Campo obrigatório'
  ]);

});
