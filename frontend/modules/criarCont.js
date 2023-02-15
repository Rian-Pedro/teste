const validator = require('validator');

export default class Cont{
    constructor(classForm){
        this.form = document.querySelector(classForm);
    }
    
    init() {
        this.events();
    }
    
    events() {
        if(!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validate(e);
        });
    }

    validate(e) {
        const el = e.target;

        this.cleanUp(el);

        const inputs = {
            nome: el.querySelector('input[name="nome"]'),
            email: el.querySelector('input[name="email"]'),
            telefone: el.querySelector('input[name="telefone"]')
        }

        let error = false;

        if(!inputs.nome.value){
            this.erroMsg(inputs.nome, 'O nome é um campo obrigatorio');
            inputs.nome.classList.replace('border-dark', 'border-danger');
            error = true;
        }

        if(inputs.email.value){
            if(!validator.isEmail(inputs.email.value)){
                this.erroMsg(inputs.email, 'O e-mail precisa ser válido');
                inputs.email.classList.replace('border-dark', 'border-danger');
                error = true;
            }   
        }

        if(!inputs.email.value && !inputs.telefone.value){
            alert('É preciso pelo menos uma forma de contato: E-mail ou telefone');
            inputs.email.classList.replace('border-dark', 'border-danger');
            inputs.telefone.classList.replace('border-dark', 'border-danger');
            error = true;
        }

        if(!error) el.submit();

    }

    cleanUp(el) {
        const msgs = el.querySelectorAll('.erro-msg');
        msgs.forEach(msg => {
            msg.remove();
        });

        const inpErros = el.querySelectorAll('.border-danger');

        inpErros.forEach(inp => {
            inp.classList.replace('border-danger', 'border-dark');
        });

    }

    erroMsg(elemnt,msg){
        elemnt.insertAdjacentHTML('afterend', `<p class="erro-msg">${msg}</p>`);
    }

}