const getAboutPage = (req, res) => {
    res.render("main", {
        data: {
            title: "About Page",
            page: "about"
        }
    })
}
export {getAboutPage}