const isMineOrAdmin=(req,res,next)=>{
    if (req.session.isAuth && (req.session.role == 0 || req.session.username == req.params.username)){
        return next();
    }
    res.redirect("/")

} 
export default { isMineOrAdmin }