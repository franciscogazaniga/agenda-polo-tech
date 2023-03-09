import { Header } from "../components/header.component.js"

const root = document.getElementById('root')
const contactsDetails = document.createElement('div')
contactsDetails.setAttribute("id", "p-contact-details")

const events = () => {
    const goBack = contactsDetails.querySelector('#go-back')
    goBack.addEventListener('click', () => {
        history.replaceState(null, "", "/#contacts")// modifica a rota sem reload
        window.location.reload() // força o reload da página com a nova hash
    })
}

export const ContactDetails = () => {
    const header = Header()
    root.append(header)

    const contato = window.history.state

    contactsDetails.innerHTML = `
        <div id="title">
          <h1>${contato.nome}</h1>
          <button id="go-back" type="button">Voltar</button>
        </div>

        <br>
        <p><b>Nome: </b>${contato.nome}</p>
        <p><b>Apelido: </b>${contato.apelido}</p>
        <p><b>E-mail: </b>${contato.email}</p>
        <p><b>Notas: </b>${contato.notas}</p>

        <br>
        <h3>Endereço</h3>
        <p><b>CEP: </b>${contato.endereco.cep}</p>
        <p><b>Logradouro: </b>${contato.endereco.logradouro}</p>
        <p><b>Cidade: </b>${contato.endereco.cidade}</p>
        <p><b>Estado: </b>${contato.endereco.estado}</p>
        <p><b>País: </b>${contato.endereco.pais}</p>  
        
        <br>
        <h3>Telefone</h3>
        `

    contato.telefones.forEach((telefone) => {
        contactsDetails.innerHTML += `
            <hr>
            <p>${telefone.tipo}</p>        
            <p>${telefone.numero}</p>        
        `
    })

    events()
    return contactsDetails
}