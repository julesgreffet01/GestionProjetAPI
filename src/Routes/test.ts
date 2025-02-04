import {AdminDAO} from "../Models/DAO/AdminDAO";
import {Admin} from "../Models/BO/Admin";


export async function lancementTest(res: any) {
    if (await AdminDAO.find(1)) {
        console.log("find correct admin")
    } else {
        throw new Error();
    }
    if(await AdminDAO.find(5) == null) {
        console.log("find null admin")
    } else {
        throw new Error();
    }
    const admindao = new AdminDAO();
    if (await admindao.authentification("admin", "test")) {
        console.log("auth correct admin")
    } else {
        throw new Error();
    }
    if(await admindao.authentification("zae", "test") == null) {
        console.log("mauvais log admin")
    } else {
        throw new Error();
    }


    res.status(200).send('Passwords checked and hashed if necessary');
}
