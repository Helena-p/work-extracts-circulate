// desktop user flow
describe('Testing add-to-cart user flow', () => {
	before(() => {
		cy.visitLandingPage();
		cy.viewport(Cypress.env('small_laptop'));
	});
	it('Navigate to /shop from landing page navbar, select first product card and navigate to product page. Add the product to cart, continue to cart page', () => {
		// go to Shop by clicking on first menu link in navigation bar
		cy.get('body').should('be.visible');
		cy.get("#desktop-nav-actions > a[href='/shop']").should('be.visible', {
			timeout: Cypress.env('timeout'),
		});
		cy.get("#desktop-nav-actions > a[href='/shop']").click();
		cy.url({
			timeout: Cypress.env('timeout'),
		}).should('include', 'shop');

		// get first product card
		cy.get('[href="/shop?mode=hitlist"]').click();
		cy.url().should('include', 'shop');
		cy.get("[data-testid='product-card']", {
			timeout: Cypress.env('timeout'),
		}).should('be.visible');

		// Get first productCard with a price, click and navigate to product page
		cy.get("[data-testid='product-card']:Contains('€')")
			.first()
			.find("[data-testid='product-card-button']")
			.click();
		cy.url({ timeout: Cypress.env('timeout') }).should(($url) => {
			expect($url).to.contain('products');
		});

		// open add-to-cart-dialog
		cy.get("button[data-testid='add-to-cart']").click();
		// This request can sometimes be really slow
		// TODO: should probably have an intercept
		cy.get("[role='dialog']", { timeout: Cypress.env('timeout') * 2 })
			.find('#alert-dialog-description')

			// check modal dialog confirmation
			.should(($alert) => {
				expect($alert).to.have.text(
					'Items successfully added to your cart'
				);
			});
		// place product in cart
		cy.get("[data-testid='modal-accept']").click();
	});
});
