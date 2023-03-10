import { Header } from "../components/header.component.js"
import { deletarContato } from "../services/contact.service.js"

const root = document.getElementById('root')
const contactsDetails = document.createElement('section')
contactsDetails.setAttribute("id", "p-contact-details")

const contactsFooter = document.createElement('section')
contactsFooter.setAttribute("id", "p-contact-details-footer")

const events = () => {
    const goBack = contactsDetails.querySelector('#go-back')
    goBack.addEventListener('click', () => {
        history.replaceState(null, "", "/#contacts")// modifica a rota sem reload
        window.location.reload() // força o reload da página com a nova hash
    })

    const deleteContact = contactsDetails.querySelector('#delete-button')
    const contato = window.history.state

    deleteContact.addEventListener('click', () => {
        const contactToDelete = {
            idContato: undefined,
        }
        contactToDelete["idContato"] = contato.id
   
        deletarContato(contactToDelete)
            .then((response) => {
                const retorno = contactsFooter.querySelector("#retorno")

                if(response.status === 400) {
                    retorno.innerText = response.mensagem
                }
                
                if(response.status === 200) {
                    window.location.href = "/#contacts"
                }
            })
            .catch((error) => {
                console.log("deu ruim")
                console.error(error)
            })

        //history.replaceState(null, "", "/#contacts")// modifica a rota sem reload
        //window.location.reload() // força o reload da página com a nova hash
    })
}

export const ContactDetails = () => {
    const header = Header()
    root.append(header)

    const contato = window.history.state

    contactsDetails.innerHTML = `
        <div id="title">
          <h1>${contato.nome}</h1>

          <div id="buttons">
            <button id="delete-button" type="button">Deletar contato</button>
            <button id="go-back" type="button">Voltar</button>
          </div>
        </div>

        <div>
        <br>
        <p><b>Nome: </b>${contato.nome}</p>
        <p><b>Apelido: </b>${contato.apelido}</p>
        <p><b>E-mail: </b>${contato.email}</p>
        <p><b>Notas: </b>${contato.notas}</p>

        <br>
        <h3>Endereço</h3>
        <p><b>CEP: </b>${contato.endereco.cep}</p>
        <p><b>Logradouro: </b>${contato.endereco.logradouro}</p>
        <p><b>Cidade: </b>${contato.endereco.cep}</p>
        <p><b>Estado: </b>${contato.endereco.estado}</p>
        <p><b>País: </b>${contato.endereco.pais}</p>  
        </div>
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

    contactsFooter.innerHTML = `
        <label id="retorno"></label>
    `

    contactsDetails.append(contactsFooter)

    events()
    return contactsDetails
}
