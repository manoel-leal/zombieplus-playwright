import {expect} from '@playwright/test';

export class LoginPage{
    constructor(page){
        this.page = page;
    }

    async visit(page){
        await this.page.goto('http://localhost:3000/admin/login');

        const loginForm = this.page.locator('.login-form');
        await expect(loginForm).toBeVisible();
    }

    async submit(email, password){
        await this.page.getByPlaceholder('E-mail').fill(email);
        await this.page.getByPlaceholder('Senha').fill(password);
        await this.page.getByText('Entrar').click();
        
    }

    async alertEmailHaveText(text){
        const alert = this.page.locator('.email-alert');
        await expect(alert).toHaveText(text);
    }

       async alertPasswordHaveText(text){
        const alert = this.page.locator('.password-alert');
        await expect(alert).toHaveText(text);
    }
}