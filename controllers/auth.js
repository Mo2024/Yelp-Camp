const User = require('../models/user');

module.exports.createUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err)
            req.flash('success', 'Welcome to yelp Camp')
            res.redirect('/campgrounds')
        })
    } catch (e) {
        console.log(e)
        req.flash('error', e.message)
        res.redirect('/register')

    }

}

module.exports.loginUser = (req, res) => {
    res.render('auth/login')
}

module.exports.postUser = (req, res) => {
    req.flash('success', 'welcome back!')
    const redirectUrl = req.session.returnTo || '/campgrounds'
    delete req.session.returnTo
    res.redirect(redirectUrl)
}

module.exports.registerPage = (req, res) => {
    res.render('auth/register')
}

module.exports.logoutUser = (req, res) => {
    req.logout();
    req.flash('success', "Goodbye!");
    res.redirect('/campgrounds');
}