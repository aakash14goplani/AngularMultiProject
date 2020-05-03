describe('my first test', () => {
    let systemUnderTest;

    beforeEach(() => {
        systemUnderTest = {};
    });

    it('should be true if true', () => {
        // arrange
        systemUnderTest.a = false;
        // act
        systemUnderTest.a = true;
        // assert
        expect(systemUnderTest.a).toBeTrue();
    });
});