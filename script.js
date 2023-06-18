// Global
import { Conta } from "./Conta.js";

function mensagemErro(mensagem, campo){
    apagarErros();

    const elementoErro = document.createElement('pre');
    elementoErro.classList.add('erro');
    const textoErro = document.createTextNode(mensagem);
    elementoErro.appendChild(textoErro);
    campo.after(elementoErro);
}

const apagarErros = () => {
    const erro = document.querySelector('.erro');
    if(erro != null){
        erro.remove();
    }
}

const cores = ['#fff', '#000', '#F00B00', '#1FED56', '#F7C014', '#0C18F9', '#8900FA'];
const corUsuario = () =>{
    const corGerada = cores[Math.floor(Math.random()*7)];
    return corGerada;
}

// cadastro
const inLogin = document.getElementById('inLogin');
const inCriarSenha = document.getElementById('inCriarSenha');
const btCadastrar = document.getElementById('btCadastrar');
const vetContas = [];
btCadastrar.addEventListener('click', () => {
    if(verificarInputsCadastro()){
        const novaConta = new Conta(inLogin.value, inCriarSenha.value, corUsuario());
        vetContas.push(novaConta);
        novaConta.atualizarAcessos();
        apagarErros();
        divCadastrar.style.display = 'none';
        mostrarBlog(novaConta);
    }
});
function verificarInputsCadastro(){
    if(inLogin.value == ''){
        mensagemErro('Login inválido', inLogin);
        inLogin.focus();
    }else if(loginUtilizado(inLogin.value)){
        mensagemErro('Esse login já está sendo utilizado!', inLogin)
        inLogin.value = '';
        inLogin.focus();
    }else if(inCriarSenha.value == ''){
        mensagemErro('Senha inválida!', inCriarSenha);
        inCriarSenha.focus();
    } else if(inCriarSenha.value.length < 5){
        mensagemErro('Use uma senha maior!', inCriarSenha);
        inCriarSenha.focus();
    } else{
        return true;
    }
}
function loginUtilizado(login){
    let existe = false;
    vetContas.forEach(conta => {
        if(conta.login == login){
            existe = true;
        }
    });
    return existe;
}

// troca de telas
const divCadastrar = document.getElementById('divCadastrar');
const divEntrar = document.getElementById('divEntrar');
const divBlog = document.getElementById('divBlog');

const lkLogon = document.getElementById('lkLogon');
lkLogon.addEventListener('click', () => {
    trocarTelas(divCadastrar, divEntrar);
});
const lkLogin = document.getElementById('lkLogin');
lkLogin.addEventListener('click', () => {
    trocarTelas(divEntrar, divCadastrar);
})
const lkCadastro = document.getElementById('lkCadastro');
lkCadastro.addEventListener('click', () => {
    apagarUsuarioDaTela();
    trocarTelas(divBlog, divCadastrar);
    divPerfil.style.display = 'none';
})

function trocarTelas(telaAntiga, telaNova){
    apagarErros();
    telaAntiga.style.display = 'none';
    telaNova.style.display = 'flex';
}

// entrar na conta
const inLogon = document.getElementById('inLogon');
const inSenha = document.getElementById('inSenha');
const btAcessar = document.getElementById('btAcessar');
btAcessar.addEventListener('click', entrar);
function entrar(){
    if(verificarInputsLogon()){
        const usuarioEncontrado = encontrarUsuario(inLogon.value);
        if(verificarSenha(usuarioEncontrado.senha, inSenha.value)){
            usuarioEncontrado.atualizarAcessos();
            apagarErros();
            divEntrar.style.display = 'none';
            mostrarBlog(usuarioEncontrado);
        } else{
            mensagemErro('Senha incorreta!', inSenha);
        }
    }
}

function verificarInputsLogon(){
    if(inLogon.value == ''){
        mensagemErro('Login inválido!', inLogon);
        inLogon.focus();
    } else if(!loginUtilizado(inLogon.value)){
        mensagemErro('Este usuário não existe!', inLogon);
        inLogon.value = '';
        inLogon.focus();
    } else if(inSenha.value == ''){
        mensagemErro('Senha inválida!', inSenha);
        inSenha.value = '';
        inSenha.focus();
    } else{
        return true;
    }
}

function verificarSenha(senhaReal, senhaDigitada){
    if(senhaReal == senhaDigitada){
        return true;
    } else{
        return false;
    }
}
function encontrarUsuario(usuario){
    let objUsuario;
    let naoEncontrado = true;
    for(let i = 0; i < vetContas.length && naoEncontrado; i++){
        if(usuario == vetContas[i].login){
            objUsuario = vetContas[i];
            naoEncontrado = false;
        }
    }
    if(objUsuario != undefined){
        return objUsuario;
    } else{
        return false;
    }
}

// blog
const titulo = document.getElementById('titulo');
function mostrarBlog(usuario){
    divBlog.style.display = 'flex';
    apagarUsuarioDaTela();

    const elementoUsuario = document.createElement('div');
    elementoUsuario.classList.add('usuario');
    const textoUsuario = document.createTextNode(usuario.login.split('')[0].toUpperCase());
    elementoUsuario.appendChild(textoUsuario);
    if(usuario.cor == '#fff'){
        elementoUsuario.style.color = '#000';
        elementoUsuario.style.borderColor = 'lightgrey'
    }
    elementoUsuario.style.background = usuario.cor;
    elementoUsuario.addEventListener('click', () => {
        exibirPerfil(usuario);
    });
    titulo.after(elementoUsuario);
}

// perfil
const divPerfil = document.getElementById('divPerfil');
const outLogin = document.getElementById('outLogin');
const outAcessos = document.getElementById('outAcessos');
const inNovaCor = document.getElementById('inNovaCor');
const btAplicarNovaCor = document.getElementById('btAplicarNovaCor');

function apagarUsuarioDaTela(){
    const usuarioNaTela = document.querySelector('.usuario');
    if(usuarioNaTela != null){
        usuarioNaTela.remove()
    }
}

function exibirPerfil(usuario){
    if(divPerfil.style.display == 'none' || divPerfil.style.display == ''){
        divPerfil.style.display = 'flex';

        const outInformacoes = document.querySelectorAll('.outInformacoes');
        if(outInformacoes != null){
            outInformacoes.forEach(informacao => {
                informacao.remove();
            });
        }

        const loginUsuario = document.createElement('td');
        loginUsuario.classList.add('outInformacoes');
        const textoLoginUsuario = document.createTextNode(usuario.getLogin());
        loginUsuario.appendChild(textoLoginUsuario);
        outLogin.after(loginUsuario);

        const acessosUsuario = document.createElement('td');
        acessosUsuario.classList.add('outInformacoes');
        const textoAcessosUsuario = document.createTextNode(usuario.getAcessos());
        acessosUsuario.appendChild(textoAcessosUsuario);
        outAcessos.after(acessosUsuario);

        btAplicarNovaCor.addEventListener('click', () => {
            alterarCor(usuario, inNovaCor.value);
            divPerfil.style.display = 'none';
        });
    } else{
        divPerfil.style.display = 'none';
    }
}

function alterarCor(usuario, novaCor){
    usuario.alterarCor(novaCor);
    mostrarBlog(usuario);
}