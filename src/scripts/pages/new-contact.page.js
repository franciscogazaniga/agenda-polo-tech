import { criarContato } from "../services/contact.service"
import { Header } from "../components/header.component.js"

const newcontactsection = document.createElement('section')
const newcontacttitle = document.createElement('div')
const newcontactform = document.createElement('form')
newcontactform.setAttribute("id", "p-new-contact")

const events = () => {
    const goBack = newcontacttitle.querySelector('#go-back')
    goBack.addEventListener('click', () => {
        history.replaceState(null, "", "/#contacts")// modifica a rota sem reload
        window.location.reload() // força o reload da página com a nova hash
    })

    newcontactform.addEventListener('submit', (e) => {
        e.preventDefault()

        const fd = new FormData(newcontactform)
        const data = Object.fromEntries(fd)

        criarContato(data)
            .then((response) => {
                const retorno = newcontactform.querySelector("#retorno")

                if(response.status === 409) {
                    retorno.innerText = response.mensagem
                }
                
                if(response.status === 200) {
                    window.location.href = "/#contacts"
                }
            })
            .catch((error) => {
                console.error(error)
            })
    })
}

export const NewContact = () => {
    const header = Header()
    root.append(header)
    root.append(newcontactsection)
    newcontactsection.append(newcontacttitle)
    newcontactsection.append(newcontactform)

    newcontacttitle.innerHTML = `
      <div id="title">
        <h1>Novo contato</h1>
        <button id="go-back" type="button">Voltar</button>
      </div>
    `

    newcontactform.innerHTML = `
        <label for="nome">Nome</label>
        <input id="nome" name="nome" type="text" />

        <label for="apelido">Apelido</label>
        <input id="apelido" name="apelido" type="text" />

        <label for="email">E-mail</label>
        <input id="email" name="email" type="text" />

        <label for="notas">Notas</label>
        <input id="notas" name="notas" type="text" />

        <h3>Endereço</h3>
        <label for="cep">CEP</label>
        <input id="cep" name="cep" type="text" />

        <label for="logradouro">Logradouro</label>
        <input id="logradouro" name="logradouro" type="text" />

        <label for="cidade">Cidade</label>
        <input id="cidade" name="cidade" type="text" />

        <label for="estado">Estado</label>
        <input id="estado" name="estado" type="text" />

        <label for="pais">País</label>
        <input id="pais" name="pais" type="text" />

        <h3>Telefone</h3>
        <label for="tipo">Tipo</label>
        <input id="tipo" name="tipo" type="text" />

        <label for="numero">Número</label>
        <input id="numero" name="numero" type="text" />

        <button id="btn-criar">Cadastrar</button>
        
        <br>

        <label id="retorno"></label>
    `

    events()
    return newcontactsection
}