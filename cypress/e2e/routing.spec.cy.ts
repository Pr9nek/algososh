import { testUrl } from "../../src/constants/constants";
// import { linkToString } from "../../src/constants/constants";

describe("app works correctly with routes", function () {
    before(function () {
        cy.visit('/');
    });

    it('opens with the start page', () => {
        cy.contains('МБОУ АЛГОСОШ');
    });

    it("should open string-page", function () {
        cy.visit('/recursion');
        cy.contains('Строка');
        cy.contains('К оглавлению').click();
    });

    it("should open fibonacci-page", function () {
        cy.visit('/fibonacci');
        cy.contains('Последовательность Фибоначчи');
        cy.contains('К оглавлению').click();
    });

    it("should open sorting-page", function () {
        cy.visit('/sorting');
        cy.contains('Сортировка массива');
        cy.contains('К оглавлению').click();
    });

    it("should open stack-page", function () {
        cy.visit('/stack');
        cy.contains('Стек');
        cy.contains('К оглавлению').click();
    });

    it("should open queue-page", function () {
        cy.visit('/queue');
        cy.contains('Очередь');
        cy.contains('К оглавлению').click();
    });

    it("should open list-page", function () {
        cy.visit('/list');
        cy.contains('Связный список');
        cy.contains('К оглавлению').click();
    });
});