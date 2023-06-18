export class Conta{
    constructor(_login, _senha, _cor){
        this.login = _login;
        this.senha = _senha;
        this.cor = _cor;
        this.acessos = 0;
    }

    getLogin(){
        return this.login;
    }
    getCor(){
        return this.cor;
    }
    getAcessos(){
        return this.acessos;
    }

    atualizarAcessos(){
        this.acessos ++;
    }
    alterarCor(novaCor){
        this.cor = novaCor;
    }
}