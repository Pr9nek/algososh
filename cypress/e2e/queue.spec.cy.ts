import { circleSelector, elementStates, testCircleSelector, HeadSelector, IndexSelector, TailSelector, LetterSelector } from '../../src/constants/constants';
import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

describe('queue page works correctly', function () {
    beforeEach(function () {
        cy.visit('/queue');
    });

    const addButton = "Добавить";
    const delButton = "Удалить";
    const clearButton = "Очистить";

    it('if the input is empty,the button is not available', () => {
        cy.get('input').clear();
        cy.contains(addButton).should('be.disabled');
        cy.get('input').type('5');
        cy.contains(addButton).should('be.enabled');
    });

    it('should add elements correctly', () => {
        cy.get(circleSelector).each(($el, index, $list) => {
            cy.get($el).should('have.css', 'border-color', elementStates.default);
        });

        cy.get(IndexSelector).each(($el, index) => {
            expect($el).to.contain(index);
        });

        // добавляем первый элемент

        cy.get('input').type('fir');
        cy.contains(addButton).click();

        cy.get(circleSelector).eq(0).within(($el) => {
            cy.get($el).should("have.css", "border-color", elementStates.changing);
            cy.get($el).should("have.css", "border-color", elementStates.default);
            cy.get($el).children(LetterSelector).contains('fir');
        });

        cy.get(testCircleSelector).as('circle').each(($el, index) => {
            if (index === 0) {
                cy.wrap($el).children(HeadSelector).contains('head');
                cy.wrap($el).children(TailSelector).contains('tail');
            }
        });

        cy.get(IndexSelector).each(($el, index) => {
            expect($el).to.contain(index);
        });

        // добавляем второй элемент

        cy.get('input').should('be.empty');
        cy.get('input').type('sec');
        cy.contains(addButton).click();

        cy.get(circleSelector).eq(0).within(($el) => {
            cy.get($el).should("have.css", "border-color", elementStates.default);
            cy.get($el).children(LetterSelector).contains('fir');
        });

        cy.get(circleSelector).eq(1).within(($el) => {
            cy.get($el).should("have.css", "border-color", elementStates.changing);
            cy.get($el).should("have.css", "border-color", elementStates.default);
            cy.get($el).children(LetterSelector).contains('sec');
        });

        cy.get(testCircleSelector).as('circle').each(($el, index) => {
            if (index === 0) {
                cy.wrap($el).children(HeadSelector).contains('head');
            }
            if (index === 1) {
                cy.wrap($el).children(TailSelector).contains('tail');
            }
        });

        cy.get(IndexSelector).each(($el, index) => {
            expect($el).to.contain(index);
        });

        // добавляем третий элемент

        cy.get('input').should('be.empty');
        cy.get('input').type('thir');
        cy.contains(addButton).click();

        cy.get(circleSelector).eq(0).within(($el) => {
            cy.get($el).should("have.css", "border-color", elementStates.default);
            cy.get($el).children(LetterSelector).contains('fir');
        });

        cy.get(circleSelector).eq(1).within(($el) => {
            cy.get($el).should("have.css", "border-color", elementStates.default);
            cy.get($el).children(LetterSelector).contains('sec');
        });

        cy.get(circleSelector).eq(2).within(($el) => {
            cy.get($el).should("have.css", "border-color", elementStates.changing);
            cy.get($el).should("have.css", "border-color", elementStates.default);
            cy.get($el).children(LetterSelector).contains('thir');
        });

        cy.get(testCircleSelector).as('circle').each(($el, index) => {
            if (index === 0) {
                cy.wrap($el).children(HeadSelector).contains('head');
            }
            if (index === 2) {
                cy.wrap($el).children(TailSelector).contains('tail');
            }
        });

        cy.get(IndexSelector).each(($el, index) => {
            expect($el).to.contain(index);
        });

    });

    it('should del elements correctly', () => {
        cy.get('input').clear();
        cy.get('input').type('fir');
        cy.contains(addButton).click();

        cy.get('input').type('sec');
        cy.contains(addButton).click();

        cy.get('input').type('thir');
        cy.contains(addButton).click();

        cy.get(circleSelector)
        cy.wait(SHORT_DELAY_IN_MS);

        cy.contains(delButton).click();

        cy.get(circleSelector).eq(0).within(($el) => {
            // cy.get($el).children(LetterSelector)    .contains('');
            cy.get($el).should("have.css", "border-color", elementStates.changing);
            cy.get($el).should("have.css", "border-color", elementStates.default);
            cy.get($el).children(LetterSelector).should('be.empty');
        });

        cy.get(IndexSelector).each(($el, index) => {
            expect($el).to.contain(index);
        });

        cy.get(testCircleSelector).as('circle').each(($el, index) => {
            if (index === 1) {
                cy.wrap($el).children(HeadSelector).contains('head');
            }
            if (index === 2) {
                cy.wrap($el).children(TailSelector).contains('tail');
            }
        });

        cy.contains(delButton).click();

        cy.get(circleSelector).eq(1).within(($el) => {
            // cy.get($el).children(LetterSelector)    .contains('');
            cy.get($el).should("have.css", "border-color", elementStates.changing);
            cy.get($el).should("have.css", "border-color", elementStates.default);
            cy.get($el).children(LetterSelector).should('be.empty');
        });

        cy.get(IndexSelector).each(($el, index) => {
            expect($el).to.contain(index);
        });

        cy.get(testCircleSelector).as('circle').each(($el, index) => {
            if (index === 2) {
                cy.wrap($el).children(HeadSelector).contains('head');
            }
            if (index === 2) {
                cy.wrap($el).children(TailSelector).contains('tail');
            }
        });

        cy.contains(delButton).click();

        cy.get(circleSelector).eq(2).within(($el) => {
            cy.get($el).should("have.css", "border-color", elementStates.changing);
            cy.get($el).should("have.css", "border-color", elementStates.default);
            cy.get($el).children(LetterSelector).should('be.empty');
        });

        cy.get(IndexSelector).each(($el, index) => {
            expect($el).to.contain(index);
        });

        cy.get(testCircleSelector).as('circle').each(($el, index) => {
            if (index === 2) {
                cy.wrap($el).children(HeadSelector).should('be.empty');;
            }
            if (index === 2) {
                cy.wrap($el).children(TailSelector).should('be.empty');;
            }
        });
    });

    it('should remove all the elements correct', () => {
        cy.get('input').clear();
        cy.get('input').type('fir');
        cy.contains(addButton).click();

        cy.get('input').type('sec');
        cy.contains(addButton).click();

        cy.get('input').type('thir');
        cy.contains(addButton).click();

        cy.get(circleSelector)
        cy.wait(SHORT_DELAY_IN_MS);

        cy.contains(clearButton).click()
        cy.get(testCircleSelector).as('circle').each(($el, index) => {
                cy.wrap($el).children(LetterSelector).should('have.length', 0);
        });
    })
});


