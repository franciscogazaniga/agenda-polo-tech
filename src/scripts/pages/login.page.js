import { entrar } from "../services/auth.service.js"

const loginsection = document.createElement('section')
loginsection.setAttribute("id", "container-login")

const login = document.createElement('form')
login.setAttribute("id", "p-login")

const events = () => {
    login.addEventListener('submit', async (e) => {
        e.preventDefault()

        const fd = new FormData(login)
        const data = Object.fromEntries(fd)

        entrar(data)
            .then((response) => {
                sessionStorage.setItem('@user', JSON.stringify(response.data))
                sessionStorage.setItem("@token", response.data.token)

                history.replaceState(null, "", "/#contacts")// modifica a rota sem reload
                window.location.reload() // força o reload da página com a nova hash
            })
    })
}

export const Login = () => {
    root.append(loginsection)

    loginsection.innerHTML = `
    <img src="https://ada-site-frontend.s3.sa-east-1.amazonaws.com/home/header-logo.svg" class="sc-86ca6303-7 fFgJEq">
    `

    loginsection.append(login)

    login.innerHTML = `
        <label for="email">Usuário</label>
        <input id="email" name="email" type="email" />

        <label for="senha">Senha</label>
        <input id="senha" name="senha" type="password" />

        <fildset>
            <input name="salvar" id="salvar" type="radio" value="true" />
            <label for="salvar">Salvar</label>
            <input name="salvar" id="nao-salvar" type="radio" value="false" />
            <label for="nao-salvar">Não salvar</label>
        </fildset>

        <button id="btn-entrar">Entrar</button>
        <p>Não tem conta? <a href="/#signup">Crie agora!</a></p>
    `

    events()
    return loginsection
}
