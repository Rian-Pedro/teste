const Contato = require('../models/contatoModel');

exports.index = (req, res) => {
    if(!req.session.user){
        req.flash('errors', 'Você precisa fazer login, ou criar uma conta para criar/editar contatos');
        return res.redirect('/');
    }
    res.render('contato', { contato: {} });
}

exports.criar = async (req, res) => {
    const contato = new Contato(req.body, req.session.user.email);
    
    await contato.criar();

    if(contato.errors.length > 0){
        req.flash('errors', contato.errors);
        req.session.save(() => {
            return res.redirect('/contato/index');
        });

        return;
    }

    req.flash('success', 'contato criado com sucesso');
    req.session.save(() => {
        return res.redirect('/');
    });

    return;

}

exports.remove = async (req, res) => {
    const contato = await Contato.remove(req.params.id);
    res.redirect('/');
}

exports.editar = async (req, res) => {
    const contato = await Contato.buscaContato(req.params.id);
    res.render('contato', { contato });
}

exports.update = async (req, res) => {
    const contato = new Contato(req.body);
    await contato.edit(req.params.id, req.session.user.email);

    if(contato.errors.length > 0){
        req.flash('errors', contato.errors);
        req.session.save(() => {
            return res.redirect('back');
        });
        return;
    }

    req.flash('success', `Contato ${contato.contato.nome} atualizado com sucesso`);
    req.session.save(() => {
        return res.redirect('/');
    });

    return;

}