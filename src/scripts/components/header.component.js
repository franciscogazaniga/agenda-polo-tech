export const Header = () => {
    const header = document.createElement('header')
    header.setAttribute("id", "c-header")

    const usuario = JSON.parse(sessionStorage.getItem("@user"))

    const events = () => {
        const btnSair = header.querySelector('#btn-sair')
        btnSair.addEventListener('click', () => {
            sessionStorage.clear()
            history.replaceState(null, "", "/#login")// modifica a rota sem reload
            window.location.reload() // força o reload da página com a nova hash
        })
    }

    header.innerHTML = `
        <img src="https://ada-site-frontend.s3.sa-east-1.amazonaws.com/home/header-logo.svg" class="sc-86ca6303-7 fFgJEq">
        <span>Agenda de ${usuario.nome}</span>
        <button id="btn-sair" type="button">Sair</button>
    `

    events()
    return header
}
