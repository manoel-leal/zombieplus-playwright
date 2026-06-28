const { expect } = require('@playwright/test');

export class Movies{

    constructor(page){
        this.page = page;
    }

    async goForm(){
        await this.page.locator('a[href="/admin/movies/register"]').click();
    }

    async submit(){
        await this.page.getByRole('button', {name: 'Cadastrar'}).click();
    }

    async create(title, overview, company, release_year){
        
        await this.goForm();

        await this.page.getByLabel('Titulo do filme').fill(title);
        await this.page.getByLabel('Sinopse').fill(overview);

        // # precedendo o nome do elemento indica que é o id, . precedendo o nome do elemento indica que é uma class
        // ou seja para o comando abaixo é como se fosse um xpath //*[@id='select_company_id']//*[@class='react-select__indicator']
        await this.page.locator('#select_company_id .react-select__indicator').click();

        // recupera o html da página, muito utilizado quando não conseguimos utilizar a ferramenta de dev tools do navegador devido que o elemento esta escondido.
        const html = await this.page.content();

        // exibir no log o html da página no momento, após printar o html no console, pegar o conteúdo e jogar dentro de um arquivo para fazer a inspenção por la
        console.log(html);

        await this.page.locator('.react-select__option')
            .filter({ hasText: company})
            .click();

        await this.page.locator('#select_year .react-select__indicator').click();

               await this.page.locator('.react-select__option')
            .filter({ hasText: release_year})
            .click();

        await this.submit();

    }

    async alertHaveText(target){
        await expect(this.page.locator('.alert')).toHaveText(target);
    }
}