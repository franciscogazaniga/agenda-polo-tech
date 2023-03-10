import { CardContact } from "../components/card-contact.component.js"
import { Header } from "../components/header.component.js"
import { buscarContatos } from "../services/contact.service.js"

const root = document.getElementById('root')
const contacts = document.createElement('section')
contacts.setAttribute("id", "p-contacts")

const events = () => {
    const btnNewContact = contacts.querySelector('#btn-new-contact')
    btnNewContact.addEventListener('click', () => {
        history.replaceState(null, "", "/#new-contact")// modifica a rota sem reload
        window.location.reload() // força o reload da página com a nova hash
    })

    buscarContatos()
        .then((contatos) => {
            const cards = contacts.querySelector('#cards')
            const contactNull = contacts.querySelector('#contactNull')

            const objectContatos = contatos.data

            if(Object.keys(objectContatos).length === 0) {
                contactNull.className = 'showContactNull'
            } else {
                contactNull.className = 'hideContactNull'
                contatos.data.forEach((item) => {
                    const cardContact = CardContact(item)
                    cards.append(cardContact)
                })
            }

        })
}

export const Contacts = () => {
    const header = Header()
    root.append(header)

    contacts.innerHTML = `
        <div id="title">
            <h1>Contatos</h1>
            <button id="btn-new-contact" type="button">Novo Contato</button>
        </div>

        <div id="cards">
            <div id="contactNull">
                <i class="far fa-address-card" style="font-size: 56px"></i>
                Voce não possui nenhum contato cadastrado. 
            </div>
        </div>
    `

    events()
    return contacts
}
