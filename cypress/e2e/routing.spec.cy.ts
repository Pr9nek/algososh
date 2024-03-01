describe("app works correctly with routes", function () {
    beforeEach(function () {
        cy.visit('/');
    });

    it('opens with the start page', () => {
        cy.contains('МБОУ АЛГОСОШ');
    });


    it("should open string-page by click", function () {
        cy.get('a[href*="recursion"]').click();
        cy.contains('Строка');
        cy.contains('К оглавлению').click();
    });

    it("should open fibonacci-page", function () {
        cy.get('a[href*="fibonacci"]').click();
        cy.contains('Последовательность Фибоначчи');
        cy.contains('К оглавлению').click();
    });

    it("should open sorting-page", function () {
        cy.get('a[href*="sorting"]').click();
        cy.contains('Сортировка массива');
        cy.contains('К оглавлению').click();
    });

    it("should open stack-page", function () {
        cy.get('a[href*="stack"]').click();
        cy.contains('Стек');
        cy.contains('К оглавлению').click();
    });

    it("should open queue-page", function () {
        cy.get('a[href*="queue"]').click();
        cy.contains('Очередь');
        cy.contains('К оглавлению').click();
    });

    it("should open list-page", function () {
        cy.get('a[href*="list"]').click();
        cy.contains('Связный список');
        cy.contains('К оглавлению').click();
    });
});