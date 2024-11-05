const globalVariables = (req,res,next) => {
    res.locals.userLogin = null;
    if (req.session.isAuth){
        res.locals.userLogin = req.session.user
    }
    return next();
}
 export default  globalVariables 