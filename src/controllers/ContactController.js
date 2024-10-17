const getContactPage = (req, res) => {
    res.render("main", {
        data: {
            title: "Contact Page",
            page: "contact"
        }
    })
}
export {getContactPage}