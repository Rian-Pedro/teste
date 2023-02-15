const mongoose = require('mongoose');

const contatoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    sobrenome: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    telefone: { type: String, required: false, default: '' },
    criadoEm: { type: Date, default: Date.now },
    criadoPor: { type: String, required: true }
});

const ContatoModel = mongoose.model('Contatos', contatoSchema);

class Contato {
    constructor(body, user) {
        this.body = body;
        this.body.criadoPor = user;
        this.errors = [];
        this.contato = null;
    }

    static async remove(id) {
        await ContatoModel.findByIdAndRemove(id);
    }

    static async buscaContato(id){
        return await ContatoModel.findById(id);
    }

    static async buscaContatos(usuario) {
        const contatos = await ContatoModel.find({ criadoPor: usuario }).sort({ criadoEm: -1 });
        return contatos;
    }

    async edit(id, user) {
        this.valida();

        if(this.errors.length > 0) return;

        this.body.criadoPor = user;

        this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, { new: true });
    }

    async criar() {
        this.valida();

        if(this.errors.length > 0) return;
        
        await ContatoModel.create(this.body);

    }

    valida() {
        this.cleanUp();

        if(!this.body.nome){
            this.errors.push('O nome é um campo obrigatorio');
        }

        if(!this.body.email && !this.body.telefone){
            this.errors.push('É obrigatorio o uso de uma forma de contato: E-mail ou Telefone');
        }
    }

    cleanUp() {
        for(const key in this.body){
            if(typeof this.body[key] !== 'string'){
                this.body[key] = '';
            }
        }

        this.body = {
            nome: this.body.nome,
            sobrenome: this.body.sobrenome,
            email: this.body.email,
            telefone: this.body.telefone,
            criadoPor: this.body.criadoPor
        }

    }

}

module.exports = Contato;