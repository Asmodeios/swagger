import Home from './Home'
import { BrowserRouter } from 'react-router-dom'

describe('<Home />', () => {
  it('renders', () => {
    cy.intercept('GET', 'https://petstore.swagger.io/v2/swagger.json', {
      fixture: 'swagger.json',
    })
    cy.mount(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )
    cy.get('[data-cy=info]').should('exist')
    cy.get('[data-cy=tags-list]').should('exist')
  })
})