![poster](https://raw.githubusercontent.com/qaxperience/thumbnails/main/playwright-zombie.png)

## 🤘 Sobre

Repositório do projeto de testes automatizados do sistema Zombie Plus, construído no curso Playwright Zombie Edition! O Playwright é uma ferramenta de código aberto desenvolvida pela Microsoft que revoluciona a automação de testes em sistemas web, oferecendo uma abordagem eficaz e altamente confiável.

## 💻 Tecnologias
- Node.js
- Playwright
- Javascript
- Faker
- PostgreSQL

## 🤖 Como executar

1. Clonar o repositório, instalar as dependências
```
npm install
```

2. Executar testes em Headless
```
npx playwright test 
```

3. Executar ver o relatório dos testes
```
npx playwright show-report
```

<hr>
Curso disponível em https://qaxperience.com

## Arquiteturas

Nesse projeto tem exemplos de padrões de projetos de automação de testes diferentes como o PageObjects e o Custon actions.

- O modelo do projeto em PageObjects esta na branch page-object-model;
- O modelo baseado em Custon actions esta na branch master;
- Na branch do projeto também esta um modelo de arquitetura onde é injetada as pages(ou actions) no contexto do page que é próprio do Playwright;
- Essa injeção de dependência ocorre no arquivo index.js.