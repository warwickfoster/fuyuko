import {DashboardPage} from "./dashboard.page";
import {ActualPage} from "./actual.page";
import * as util from '../util/util';

const PAGE_NAME = 'login';
export class LoginPage implements ActualPage<LoginPage> {

    visit(): LoginPage {
         cy.visit(`/login-layout/login`);
         this.waitForReady();
         return this;
    }

    waitForReady(): LoginPage {
        util.waitUntilTestPageReady(PAGE_NAME);
        cy.wait(2000);
        return this;
    }

    validateTitle(): LoginPage {
         cy.get(`[test-page-title]`)
             .should('have.attr', 'test-page-title', PAGE_NAME);
        return this;
    }

    login(username: string, password: string): DashboardPage {
        cy.get(`[test-page-title='login']`)
            .find(`[test-field-username]`)
            .clear({force: true})
            .type(username, {force: true});
        cy.get(`[test-page-title='login']`)
            .find(`[test-field-password]`)
            .clear({force: true})
            .type(password, {force: true});
        cy.get(`[test-page-title='login']`)
            .find(`[test-button-login]`)
            .should('not.be.disabled')
            .click({force: true});
        // cy.get(`form`).submit();
        return new DashboardPage().waitForReady();
    }

    verifyErrorMessageExists(): LoginPage {
        util.clickOnErrorMessageToasts();
        return this;
    }

    verifySuccessMessageExists(): LoginPage {
        util.clickOnSuccessMessageToasts();
        return this;
    }
}

