export const authorizeDirecteur = async (req, res, next) => {
    try{
        const userRole = req;
        // console.log(userRole)
        if(userRole==="Directeur"){
            return next();
        }
        throw new Error("You are not authorized to view this page");
    }
    catch (e) {
        // console.log(e)
        return res.redirect("/");
    }
}