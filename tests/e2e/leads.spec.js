const { test, expect } = require('../support');
const { faker } = require('@faker-js/faker');

test('deve cadastrar um lead na fila de espera', async ({ page }) => {
  const message = "Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!";
  const randomName = faker.person.fullName();
  const randomEmail = faker.internet.email();

  await page.leads.visit();
  await page.leads.openLeadModal();
  await page.leads.submitLeadForm(randomName, randomEmail);
  await page.toast.haveText(message);

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

  await page.leads.visit();
  await page.leads.openLeadModal();
  await page.leads.submitLeadForm(randomName, randomEmail);
  await page.toast.haveText(message);

});

test('não deve cadastrar com e-mail inválido', async ({ page }) => {
  await page.leads.visit();
  await page.leads.openLeadModal();
  await page.leads.submitLeadForm('Pessoa teste', 'test.com');
  await page.leads.alertHaveText('Email incorreto');

});

test('não deve cadastrar quando o nome não é preenchido', async ({ page }) => {
  await page.leads.visit();
  await page.leads.openLeadModal();
  await page.leads.submitLeadForm('', 'pessoa@test.com');
  await page.leads.alertHaveText('Campo obrigatório');

});

test('não deve cadastrar quando o e-mail não é preenchido', async ({ page }) => {
  await page.leads.visit();
  await page.leads.openLeadModal();
  await page.leads.submitLeadForm('Pessoa teste', '');
  await page.leads.alertHaveText('Campo obrigatório');


});

test('não deve cadastrar quando nenhum campo é preenchido', async ({ page }) => {
  await page.leads.visit();
  await page.leads.openLeadModal();
  await page.leads.submitLeadForm('', '');
  await page.leads.alertHaveText([
    'Campo obrigatório', 
    'Campo obrigatório'
  ]);

});
