/// <reference types="cypress" />
import { API_URL } from '../../../src/constants'
describe('app should launch successfuilly', () => {
    it('is launched on localhost', () => {
        cy
            .intercept('GET', API_URL, {fixture: 'availableIngredients.json'})
            .as('getIngredients')
        cy.visit('http://localhost:3000')
    })
})
