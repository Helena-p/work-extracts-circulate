/// <reference types="Cypress" />

// visit landing page
Cypress.Commands.add('visitLandingPage', () => {
	// wait for api call to fetch discounts
	// NOTE: This is cart
	cy.intercept('/api/cart').as('loadLandingPage');
	cy.visit('/');
	cy.wait('@loadLandingPage');
});

// Login from navbar
Cypress.Commands.add('userLogIn', (email, password) => {
	cy.intercept('GET', '/api/cart').as('loadingPage');
	cy.visit('/buyer/signup#login');
	cy.wait('@loadingPage');
	cy.get('#simple-tab-1').should('have.attr', 'aria-selected', 'true');
	cy.get('#account-email').should('be.visible').type(email);
	cy.get('#account-password').should('be.visible').type(password);

	// get log in button
	cy.get("[class='css-10x6o9l'] [tabindex]")
		.should('have.text', 'Log in')
		.click();
});

// Checkout login command
Cypress.Commands.add('checkoutLogin', (email, password) => {
	cy.url().should('include', 'checkout');
	cy.get("[data-testid='login']").click();
	// check login dialog is open
	cy.get("[role='dialog']", {
		timeout: Cypress.env('timeout'),
	}).should('be.visible');

	cy.get("[role='dialog']").within(($dialog) => {
		// scope input fields to dialog form
		cy.get("input[type='email']").type(email);
		cy.get("input[type='password']").type(password);
	});
});

// Place product in cart
Cypress.Commands.add('placeItemInCart', (slug) => {
	// make sure cart is empty to start with
	cy.visit('/cart');
	cy.get("[data-testid='empty-cart']").click();
	cy.get("[data-testid='modal-accept']").click({ force: true });

	// Make sure request is intercepted for adding to cart
	cy.intercept('POST', '/api/cart/items').as('addToCart');
	cy.intercept('GET', '/api/cart').as('fetchCart');
	cy.intercept('GET', '/api/discounts').as('discounts');
	// go to product page to add product to cart
	cy.visit('/' + slug);

	// Reject cookies to avoid tracking and avoid banner covering screen captures
	cy.get("[data-testid='reject-cookies']").click();

	// Add our item to the cart
	cy.get("[data-testid='add-to-cart']").should('exist').click();

	// Wait for request adding to cart and refreshing the cart.
	cy.wait('@addToCart').its('response.statusCode').should('eq', 200);
	cy.wait(['@fetchCart', '@discounts']).spread((fetchCart, discounts) => {
		// include status code 304 if response is prefetched/cached
		expect(fetchCart.response.statusCode).to.be.oneOf([200, 304]);
		expect(discounts.response.statusCode).to.be.oneOf([200, 304]);
	});

	// check modal dialog confirmation text on add to cart
	cy.get("[role='dialog']", {
		// This request can sometimes be really slow
		// TODO: should probably have an intercept
		timeout: Cypress.env('timeout') * 2,
	}).should('be.visible');
	cy.get('#alert-dialog-description').should(($alert) => {
		expect($alert).to.have.text('Items successfully added to your cart');
	});
	cy.get("[data-testid='modal-accept']").click();
	cy.get("[role='dialog']").should('not.exist');
	// ensure UI has time to re-render and show the newly added cart item
	// This will fail if not using desktop mode!
	cy.get("[data-testid='cart-badge'] > span", {
		timeout: Cypress.env('timeout'),
	}).should('exist');
});
