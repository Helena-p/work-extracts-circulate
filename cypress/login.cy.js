/// <reference types="cypress" />

describe('Smoke test login', () => {
	before(function () {
		// load user dummy data
		cy.fixture('user_data').then(function (data) {
			globalThis.data = data;
		});
	});

	beforeEach(function () {
		cy.viewport(Cypress.env('small_laptop'));
	});

	// case - log in page loads
	it('User should be able to navigate to login page successfully', () => {
		cy.visitLandingPage();
		cy.get("[data-testid='LoginOutlinedIcon']").should('exist').click();
	});

	// case - able to submit successfully
	it('User should be able to login successfully', () => {
		cy.userLogIn(data.email, data.password);
		cy.get("[data-testid='PersonOutlineIcon']", {
			timeout: Cypress.env('timeout'),
		}).should('be.visible');
	});

	// case - signup page loads
	it('User should be able to navigate to sign-up page', () => {
		cy.visit('/buyer/signup');
	});

	// case - test errorhandling entering invalid login credentials
	it('Login should fail due to entering wrong data', () => {
		cy.intercept('POST', '/api/account/login').as('login');
		cy.userLogIn(data.email, data.password_mismatch);
		cy.wait('@login');
		cy.get('[class] [aria-live]').should(
			'have.text',
			'Log in failed! Email and/or password is incorrect. Please check text input.'
		);
	});
});
