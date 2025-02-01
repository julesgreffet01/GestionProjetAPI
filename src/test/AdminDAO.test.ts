import { expect } from "chai";
import { AdminDAO } from "../Models/DAO/AdminDAO.js";

describe("🔍 Tests AdminDAO avec vraie base de données", () => {

    it("✅ find(1) doit retourner un Admin", async () => {
        const result = await AdminDAO.find(1);
        expect(result).to.not.be.null;
        expect(result).to.have.property("_id");
    });

    it("✅ find(999) doit retourner null (Admin inexistant)", async () => {
        const result = await AdminDAO.find(999);
        expect(result).to.be.null;
    });

});
