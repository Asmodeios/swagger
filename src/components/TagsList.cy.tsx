import TagsList from './TagsList'
import { BrowserRouter } from 'react-router-dom'

describe('<TagsList />', () => {
  it('renders', () => {
    cy.fixture('swagger.json').then((swagger) => {
      cy.mount(
        <BrowserRouter>
          <TagsList tags={swagger.tags} paths={swagger.paths} />
        </BrowserRouter>
      )
      cy.get('[data-cy=tag-item]').should('have.length', swagger.tags.length)
      const endpoints = Object.keys(swagger.paths).reduce((acc, path) => {
        const methods = Object.keys(swagger.paths[path])
        methods.forEach((method) => {
          acc.push(`${path}/${method}`)
        })
        return acc
      }, [] as string[])
      cy.get('[data-cy=endpoint]').should('have.length', endpoints.length)
    })
  })
})