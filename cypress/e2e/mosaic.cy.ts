/// <reference types="cypress" />

describe('mosaic-react', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001/')
  })

  it('Should open app', () => {
    cy.get('.bp4-navbar-heading > a').should('contain.text', 'SynergyWay',)
  })

  it('Should open 3 windows at first', () => {
    cy.get('div.mosaic-tile').should('have.length', 3);
  })

  it('Should add a new window', () => {
    cy.get('div.mosaic-tile').then($tiles => {
      const initialCount = $tiles.length;
      cy.get('[title="Split Window"]').first().click();
      cy.get('div.mosaic-tile').should('have.length', initialCount + 1);
    });
  });

  it('Should delete a window', () => {
    cy.get('div.mosaic-tile').then($tiles => {
      const initialCount = $tiles.length;
      cy.get('[title="Close Window"]').first().click();
      cy.get('div.mosaic-tile').should('have.length', initialCount - 1);
    });
  });

  it('should return a successful status code', () => {
    cy.request('http://localhost:5000/company')
      .then((response) => {
        expect(response.status).to.eq(200);
      });
  });

  it('should dowload new data on click', () => {
    const initialData = cy.get('.mosaic-window-title').first();
    cy.get('.bp4-button').first().click();
    const nextData = cy.get('.mosaic-window-title').first();
    expect(initialData !== nextData);
  });
})
