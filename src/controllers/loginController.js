const Login = require('../models/LoginModel');

exports.index = (req, res) => {
    if(req.session.user) return res.render('login-logado');
    res.render('login', { login: true });
}

exports.PagRegistro = (req, res) => {
    res.render('login', { login: '' });
}

exports.register = async (req, res) => {

    try{
        const login = new Login(req.body);

        await login.registro();
    
        if(login.errors.length > 0){
            req.flash('errors', login.errors);
            req.session.save(() => {
                return res.redirect('/login/registro');
            });
            return;
        }
    
        req.flash('success', 'Sua conta foi criada com sucesso');
        req.session.save(() => {
            return res.redirect('/login/registro');
        });
    
        return;

    }catch(e){

        console.log(e);
        res.render('404');

    }

}

exports.logar = async (req, res) => {
    
    try{

        const login = new Login(req.body);
    
        await login.logar();

        if(login.errors.length > 0){
            req.flash('errors', login.errors);
            req.session.save(() => {
                return res.redirect('/login/index');
            });
            return;
        }

        req.flash('success', 'Login realizado com sucesso');
        req.session.user = login.user;
        req.session.save(() => {
            return res.redirect('/');
        });

    }catch(e){
        console.log(e);
    }

}

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('back');
}