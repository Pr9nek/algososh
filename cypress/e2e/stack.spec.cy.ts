import { circleSelector, elementStates, HeadSelector, IndexSelector } from '../../src/constants/constants';
import { SHORT_DELAY_IN_MS, DELAY_IN_MS } from "../../src/constants/delays";

describe('stack page works correctly', function () {
    beforeEach(function () {
        cy.visit('/stack');
    });

    it('if the input is empty,the button is not available', () => {
        const button = "Добавить";
        cy.get('input').clear();
        cy.contains(button).should('be.disabled');
        cy.get('input').type('5');
        cy.contains(button).should('be.enabled');
    });

    it('should add elements correctly', () => {

        //добавляем первый элемент
        cy.get('input').type('1');
        cy.get('button').contains('Добавить').click();

        cy.get(circleSelector)
            .should('have.css', 'border-color', elementStates.changing)
            .contains('1');

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(circleSelector)
            .should('have.css', 'border-color', elementStates.default)
            .contains('1')

        cy.get(HeadSelector).within(($head) => {
            expect($head.eq(0)).to.contain('top');
        });

        cy.get(IndexSelector).each(($el, index, $list) => {
            expect($el).to.contain(index);
        });

        cy.get('input').should('be.empty');

        //добавляем второй элемент
        cy.get('input').type('2');
        cy.get('button').contains('Добавить').click();

        cy.get(circleSelector)
            .eq(0)
            .should('have.css', 'border-color', elementStates.default)
            .contains('1')
        cy.get(circleSelector)
            .eq(1)
            .should('have.css', 'border-color', elementStates.changing)
            .contains('2')

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(circleSelector)
            .eq(1)
            .should('have.css', 'border-color', elementStates.default)
            .contains('2')

        cy.get(HeadSelector).contains('top');

        cy.get(IndexSelector).each(($el, index, $list) => {
            expect($el).to.contain(index);
        });

        cy.get('input').should('be.empty');

        // добавляем третий элемент
        cy.get('input').type('3');
        cy.get('button').contains('Добавить').click();

        cy.get(circleSelector)
            .eq(0)
            .should('have.css', 'border-color', elementStates.default)
            .contains('1')
        cy.get(circleSelector)
            .eq(1)
            .should('have.css', 'border-color', elementStates.default)
            .contains('2')
        cy.get(circleSelector)
            .eq(2)
            .should('have.css', 'border-color', elementStates.changing)
            .contains('3')

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(circleSelector)
            .eq(2)
            .should('have.css', 'border-color', elementStates.default)
            .contains('3')

        cy.get(HeadSelector).contains('top');

        cy.get(IndexSelector).each(($el, index, $list) => {
            expect($el).to.contain(index);
        });

        cy.get(circleSelector).each(($el, index, $list) => {
            expect($list).to.have.length(3);
        });
    });

    it('Values are removing from the stack correctly', () => {

        cy.get('input').type('9');
        cy.get('button').contains('Добавить').click()
        cy.get('input').type('67');
        cy.get('button').contains('Добавить').click()

        cy.get(circleSelector)
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get(circleSelector)
            .should('have.length', 2)

        cy.get('button').contains('Удалить').click();
        cy.get(circleSelector)
            .eq(0)
            .should("have.css", "border-color", elementStates.default)
            .contains('9')
        cy.get(circleSelector)
            .eq(1)
            .should("have.css", "border-color", elementStates.changing)
            .contains('67')

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(circleSelector)
            .should('have.length', 1)
        cy.get(HeadSelector).contains('top');

        cy.get(IndexSelector).each(($el, index, $list) => {
            expect($el).to.contain(index);
        });

        cy.get('button').contains('Удалить').click()
        cy.get(circleSelector)
            .eq(0)
            .should("have.css", "border-color", elementStates.changing)
            .contains('9')
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get(circleSelector)
            .should('have.length', 0)
    })

    it('should remove all elements from the stack correctly', () => {
        cy.get('input').type('9');
        cy.get('button').contains('Добавить').click()
        cy.get('input').type('67');
        cy.get('button').contains('Добавить').click()
        cy.wait(SHORT_DELAY_IN_MS);

        cy.get('button').contains('Очистить').click();
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get(circleSelector).should('have.length', 0)
    });

});