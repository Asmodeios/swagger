import Info from './Info'

describe('<Info />', () => {
  it('renders', () => {
    cy.fixture('swagger.json').then((swagger) => {
      cy.mount(<Info {...swagger.info} />)
      cy.get('[data-cy=title]').should('contain', swagger.info.title)
      cy.get('[data-cy=terms] a').should('have.attr', 'href', swagger.info.termsOfService)
      cy.get('[data-cy=contact] a').should('have.attr', 'href', `mailto:${swagger.info.contact.email}`)
      cy.get('[data-cy=license] a').should('have.attr', 'href', swagger.info.license.url)
    })
  })
})