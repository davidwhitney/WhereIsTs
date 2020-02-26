describe("Dependencies", () => {
    it("Can load deps", () => {
        const imports = require("./AppFactory");

        expect(imports).toBeDefined();
    });
});