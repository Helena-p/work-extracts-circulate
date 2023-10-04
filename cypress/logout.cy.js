/// <reference types="cypress" />

before(function () {
	// load user dummy data
	cy.fixture('user_data').then(function (data) {
		globalThis.data = data;
	});
});

beforeEach(function () {
	cy.viewport(Cypress.env('small_laptop'));
});

// case - test successful log out
describe('Smoke test log out', () => {
	it('User should log out successfully', () => {
		cy.userLogIn(data.email, data.password);
		cy.get("div[role='alert']", { timeout: Cypress.env('timeout') }).should(
			'be.visible',
			'have.text',
			'You are logged in to your account'
		);
		// navigate to dashboard to log out
		cy.get("[data-testid='PersonOutlineIcon']", {
			timeout: Cypress.env('timeout') * 3,
		}).should('be.visible');
		// wait for order data to load, redirect can sometimes take some time, we need some extra time to wait
		cy.url({ timeout: Cypress.env('timeout') }).should(
			'contain',
			'/dashboard'
		);
		cy.intercept('GET', '/api/account/orders', (res) => {
			expect(res.statusCode).to.equal(200);
		});
		// log out and verify
		cy.get("li a[href='/log-out']").click();
		cy.url().should('contain', '/log-out');
	});
});
