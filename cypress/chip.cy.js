/// <reference types="Cypress" />

import { type } from 'ramda';

describe('Filter chip is visible and can be removed with its filter setting', () => {
	it('Select Tape and check chip is visible. Remove filter by clicking chip', () => {
		// Intercept shop data and run without caching
		cy.intercept('GET', '/_next/data/*/shop.json', (req) => {
			// We remove the match header so we can introspect the result
			delete req.headers['if-none-match'];
		}).as('shopData');
		cy.visit('/shop?category=tape');
		cy.url().should('include', 'tape');
		cy.get('.MuiTypography-h1', {
			timeout: Cypress.env('timeout'),
		})
			.should('be.visible')
			.and('have.text', 'Tape');
		cy.get("[data-testid='category-chip']")
			.should('exist')
			.find('.MuiChip-label')
			.should('have.text', 'Categories: Tape');

		cy.wait('@shopData').then((interception) => {
			let body = interception.response.body;
			// In Vercel, the body is a string, in local dev it's an object
			if (typeof body === 'string') {
				body = JSON.parse(body);
			}
			let numProductsInCategory =
				body?.pageProps?.categories?.indexSlug?.tape?.products?.results
					?.length;
			console.log({ body, interception });
			// Make sure we have the request data when we assert the cards
			cy.get("[data-testid='product-card']").should(
				'have.length',
				numProductsInCategory
			);
		});

		cy.get("[data-testid='CancelIcon']").click();
		cy.get("[data-testid='product-card']").should('not.exist');
	});
});
