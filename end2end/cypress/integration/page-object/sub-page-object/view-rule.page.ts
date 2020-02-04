import {ActualPage} from "../actual.page";
import * as util from "../../util/util";
import {OperatorType} from "../../model/operator.model";

export class ViewRulePage implements ActualPage<ViewRulePage> {

    validateTitle(): ViewRulePage {
        cy.get(`[test-page-title]`).should('have.attr', 'test-page-title', 'view-rules');
        return this;
    }

    visit(): ViewRulePage {
        cy.visit(`/view-gen-layout/(rules//help:view-help)`);
        return this;
    }

    verifyErrorMessageExists(): ViewRulePage {
        util.clickOnErrorMessageToasts(() => {});
        return this;
    }

    verifySuccessMessageExists(): ViewRulePage {
        util.clickOnSuccessMessageToasts(() => {});
        return this;
    }

    togglePanel(ruleName: string): ViewRulePage {
        cy.get(`[test-panel-header-rule='${ruleName}']`).click({force: true});
        return this;
    }

    verifyPanelExpanded(ruleName: string, b: boolean): ViewRulePage {
        cy.get(`[test-panel-content-rule='${ruleName}']`).should(b ? 'be.visible' : 'not.be.visible');
        return this;
    }

    verifyPanelRuleDisabled(ruleName: string): ViewRulePage {
        cy.get(`[test-panel-header-rule='${ruleName}']`).should('have.attr', 'test-panel-rule-status', 'DISABLED');
        return this;
    }

    verifyPanelRuleEnabled(ruleName: string): ViewRulePage {
        cy.get(`[test-panel-header-rule='${ruleName}']`).should('have.attr', 'test-panel-rule-status', 'ENABLED');
        return this;
    }

    disableRule(ruleName: string): ViewRulePage {
        cy.get(`[test-icon-disable-rule='${ruleName}']`).click({force: true});
        return this;
    }

    enableRule(ruleName: string): ViewRulePage {
        cy.get(`[test-icon-enable-rule='${ruleName}']`).click({force: true});
        return this;
    }

    deleteRule(ruleName: string): ViewRulePage {
        cy.get(`[test-icon-remove-rule='${ruleName}']`).click({force: true});
        return this;
    }

    editRulePopup(ruleName: string): ViewRulePage {
        cy.get(`[test-icon-edit-rule-popup='${ruleName}']`).click({force: true});
        return this;
    }

    editRuleExternal(ruleName: string): ViewRulePage {
        cy.get(`[test-icon-edit-rule='${ruleName}']`).click({force: true});
        return this;
    }

    selectWhenClauseAttribute(whenClauseId: number, attributeName: string): ViewRulePage {
        return this;
    }

    selectWhenClauseOperator(operator: OperatorType): ViewRulePage {
        return this;
    }


}