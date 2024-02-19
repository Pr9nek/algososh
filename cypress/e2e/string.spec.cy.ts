import { testUrl } from "../../src/constants/constants";

describe("string-page works correctly", function () {
  before(function () {
    cy.visit(`${testUrl}/recursion`);
  });

  it('Example test', () => {
    expect(true).to.eq(true)
})
});