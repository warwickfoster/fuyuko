import {PartnerPage} from "../page-object/partner.page";
import {LoginPage} from "../page-object/login.page";
import {PartnerThumbnailPage} from "../page-object/sub-page-object/partner-thumbnail.page";


describe('partner thumbnail spec', () => {

    let partnerPage: PartnerPage;
    let partnerThumbnailPage: PartnerThumbnailPage;


    before(() => {
        // const username = Cypress.env('username');
        // const password = Cypress.env('password');
        // partnerPage = new LoginPage()
        //     .visit()
        //     .login(username, password)
        //     .visitPartnerPage()
        // ;
    });

    after(() => {
        // localStorage.clear();
        // sessionStorage.clear();
    });


    beforeEach(() => {
        // cy.restoreLocalStorage();
        const username = Cypress.env('username');
        const password = Cypress.env('password');
        partnerPage = new LoginPage()
            .visit()
            .login(username, password)
            .visitPartnerPage()
        ;
        partnerThumbnailPage = partnerPage.visitPartnerThumbnailPage();
        // cy.wait(1000);
    });

    afterEach(() => {
        // cy.saveLocalStorage();
    });

    it('should load', () => {
        partnerThumbnailPage.validateTitle();
    });

    //////////////////


    it(`should expand 'show more' link`, () => {
        partnerThumbnailPage
            .selectPricingStructure(`Test View 1`,`Pricing Structure #1`)
            .verifyIsShowMoreExpanded(`Item-1`, false)
            .clickShowMoreLink(`Item-1`)
            .verifyIsShowMoreExpanded(`Item-1`, true)
            .verifyItemName(`Item-1`)
            .verifyItemPrice(`Item-1`, '1.10')
            .verifyItemAttributeValue(`Item-1`, `string attribute`, [`some`, `string`])
            .verifyItemAttributeValue(`Item-1`, `text attribute`, [`some`, `text`])
    });

    it(`should allow flipping through next and previous images`, () => {
        partnerThumbnailPage
            .selectPricingStructure(`Test View 1`,`Pricing Structure #1`)
            .clickNextItemImage(`Item-1`)
            .clickNextItemImage(`Item-1`)
            .clickPreviousItemImage(`Item-1`)
    });

    it(`should show side menu`, () => {
        partnerThumbnailPage
            .selectPricingStructure(`Test View 1`, `Pricing Structure #1`)
            .clickShowSideMenu(`Item-1`)
            .verifySideMenuVisible(true)
            .clickCloseSideMenu()
            .verifySideMenuVisible(false)
            .clickShowSideMenu(`Item-1`)
            .verifySideMenuVisible(true)
            .verifySideMenuItemName(`Item-1`)
            .verifySideMenuItemPrice(`1.10`)
            .verifySideMenuAttributeValue(`string attribute`, [`some`, `string`])
            .verifySideMenuAttributeValue(`text attribute`, [`some`, `text`])

            .clickShowSideMenu(`Item-2`)
            .verifySideMenuVisible(true)
            .clickCloseSideMenu()
            .verifySideMenuVisible(false)
            .clickShowSideMenu(`Item-2`)
            .verifySideMenuVisible(true)
            .verifySideMenuItemName(`Item-2`)
            .verifySideMenuItemPrice(`2.20`)
            .verifySideMenuAttributeValue(`string attribute`, [])
            .verifySideMenuAttributeValue(`text attribute`, [])
    });

    it(`should have the correct item and attribute values`, () => {
        partnerThumbnailPage
            .selectPricingStructure(`Test View 1`,`Pricing Structure #1`)
            .clickShowMoreLink(`Item-2`)
            .verifyIsShowMoreExpanded(`Item-2`, true)
            .verifyItemName(`Item-2`)
            .verifyItemPrice(`Item-2`, '2.20')
            .verifyItemAttributeValue(`Item-2`, `string attribute`, [])
            .verifyItemAttributeValue(`Item-2`, `text attribute`, [])
    });

});
