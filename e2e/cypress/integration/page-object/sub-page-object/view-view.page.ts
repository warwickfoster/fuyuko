
import {ActualPage} from "../actual.page";
import * as util from "../../util/util";
import {ViewViewEditPopupPage} from "./sub-sub-page-object/view-view-edit-popup.page";

const PAGE_NAME = 'view-views';
export class ViewViewPage implements ActualPage<ViewViewPage> {

    selectGlobalView(viewName: string): ViewViewPage {
        cy.waitUntil(() => cy.get(`[test-mat-select-global-view]`)).first().click({force: true});
        cy.waitUntil(() => cy.get(`[test-mat-select-option-global-view='${viewName}']`)).click({force: true})
            .wait(1000);
        cy.waitUntil(() => cy.get(`[test-page-ready='true']`));
        return this;
    }

    validateTitle(): ViewViewPage {
        cy.get(`[test-page-title]`).should('have.attr', 'test-page-title', PAGE_NAME);
        return this;
    }

    visit(): ViewViewPage {
        cy.visit(`/view-layout/(views//help:view-help)`);
        this.waitForReady();
        return this;
    }

    waitForReady(): ViewViewPage {
        util.waitUntilTestPageReady(PAGE_NAME);
        return this;
    }

    verifyErrorMessageExists(): ViewViewPage {
        util.clickOnErrorMessageToasts();
        return this;
    }

    verifySuccessMessageExists(callbackFn?: () => void): ViewViewPage {
        util.clickOnSuccessMessageToasts();
        return this;
    }

    clickAdd(): ViewViewEditPopupPage {
        cy.get(`[test-button-add-view]`).click({force: true});
        return new ViewViewEditPopupPage();
    }

    clickDelete(viewNames: string[]): ViewViewPage {
        cy.wrap(viewNames).each((e, i, a) => {
            return cy.get(`[test-page-title]`).then((_) => {
                const length = _.find(`[test-mat-checkbox='${viewNames[i]}'].mat-checkbox-checked`).length;
                if (length <= 0) { // not already checked
                    return cy.get(`[test-mat-checkbox='${viewNames[i]}'] label`).click({force: true});
                }
                return cy.wait(1000);
            })
        });
        cy.get(`[test-button-delete-view]`).click({force: true});
        return this;
    }

    clickSave(): ViewViewPage {
        cy.get(`[test-button-save-view]`).click({force: true});
        return this;
    }

    clickReload(): ViewViewPage {
        cy.get(`[test-button-reload-view]`).click({force:true});
        return this;
    }

    verifyViewExits(viewName: string): ViewViewPage {
        cy.get(`[test-row-view='${viewName}']`).should('exist');
        return this;
    }

    verifyViewDontExits(viewName: string): ViewViewPage {
        cy.get(`[test-row-view='${viewName}']`).should('not.exist');
        return this;
    }

    verifyViewDescription(viewName: string, viewDescription: string): ViewViewPage {
        cy.get(`[test-row-view='${viewName}']`)
            .find(`[test-view-editor='description']`)
            .find(`[test-view-editor-value='description']`)
            .should('contain.value', viewDescription);
        return this;
    }

    verifyViewName(viewName: string): ViewViewPage {
        cy.get(`[test-row-view='${viewName}']`)
            .find(`[test-view-editor='name']`)
            .find(`[test-view-editor-value='name']`)
            .should('contain.value', name);
        return this;
    }

}
