const validator = require('validator');

export default class Login{
    constructor(classForm){
        this.form = document.querySelector(classForm);
    }

    init(){
        this.events();
    }

    events(){
        if(!this.form) return;
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.validate(e);
        });
    }

    validate(e){
        const el = e.target;
        this.cleanUp(el);
        
        const emailInput = el.querySelector('input[name="email"]');
        const senhaInput = el.querySelector('input[name="senha"]');
        
        let error = false;

        if(!validator.isEmail(emailInput.value)){
            this.erroMsg(emailInput,"O e-mail precisa ser válida");
            emailInput.classList.replace('border-dark', 'border-danger');
            error = true;
        }

        if(senhaInput.value.length < 3 || senhaInput.value.length >= 50){
            this.erroMsg(senhaInput,"A senha precisa ter entre 3 e 50 caracteres");
            senhaInput.classList.replace('border-dark', 'border-danger');
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