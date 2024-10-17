const getHomePage = (req, res) => {
    res.render("main", {
        data: {
            title: "Home Page",
        }
    })
}
export {getHomePage}