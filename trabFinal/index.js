// Estado da aplicação
let itens = [];
const root = document.getElementById("root");

// === COMPONENTES ===

function Menu() {
    const menu = document.createElement("div");
    menu.classList.add("cabecalho");

    const titulo = document.createElement("h1");
    titulo.innerText = "Bem vindo!";

    const menuBotoes = document.createElement("div");
    menuBotoes.classList.add("menu");

    const botaoCadastro = document.createElement("button");
    botaoCadastro.innerText = "Cadastro";
    botaoCadastro.addEventListener("click", () => Navega("/cadastro"));

    const botaoLista = document.createElement("button");
    botaoLista.innerText = "Lista";
    botaoLista.addEventListener("click", () => Navega("/lista"));

    menuBotoes.append(botaoCadastro, botaoLista);
    menu.append(titulo, menuBotoes);

    return menu;
}

function PageCadastro() {
    const container = document.createElement("div");
    container.classList.add("pagina");

    const titulo = document.createElement("h2");
    titulo.innerText = "Cadastrar Item";

    const form = document.createElement("form");
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        adicionarItem();
    });

    const divNome = document.createElement("div");
    const labelNome = document.createElement("label");
    labelNome.innerText = "Nome:";
    const inputNome = document.createElement("input");
    inputNome.type = "text";
    inputNome.id = "itemNome";
    inputNome.required = true;
    divNome.append(labelNome, inputNome);

    const divDescricao = document.createElement("div");
    const labelDescricao = document.createElement("label");
    labelDescricao.innerText = "Descrição:";
    const inputDescricao = document.createElement("input");
    inputDescricao.id = "itemDescricao";
    inputDescricao.required = true;
    divDescricao.append(labelDescricao, inputDescricao);

    const botao = document.createElement("button");
    botao.type = "submit";
    botao.innerText = "Salvar";

    form.append(divNome, divDescricao, botao);
    container.append(titulo, form);

    return container;
}

function PageLista() {
    const container = document.createElement("div");
    container.classList.add("pagina");

    const titulo = document.createElement("h2");
    titulo.innerText = "Itens Cadastrados";

    const listaDiv = document.createElement("div");
    listaDiv.id = "itensCadastrados";

    atualizarLista(listaDiv);

    container.append(titulo, listaDiv);

    return container;
}

// === FUNÇÕES DE FUNCIONALIDADE ===

function adicionarItem() {
    const nome = document.getElementById("itemNome").value;
    const descricao = document.getElementById("itemDescricao").value;

    if (nome && descricao) {
        itens.push({ nome, descricao });
        Navega("/lista");
    }
}

function removerItem(index) {
    itens.splice(index, 1);
    Navega("/lista");
}

function atualizarLista(container) {
    container.innerHTML = "";

    if (itens.length === 0) {
        const p = document.createElement("p");
        p.innerText = "Nenhum item cadastrado ainda.";
        container.appendChild(p);
        return;
    }

    itens.forEach((item, index) => {
        const divItem = document.createElement("div");
        divItem.classList.add("item");

        const nome = document.createElement("h3");
        nome.innerText = item.nome;

        const descricao = document.createElement("p");
        descricao.innerText = item.descricao;

        const botaoRemover = document.createElement("button");
        botaoRemover.innerText = "Remover";
        botaoRemover.addEventListener("click", () => removerItem(index));

        divItem.append(nome, descricao, botaoRemover);
        container.appendChild(divItem);
    });
}

// === DARK MODE ===

function ativarDarkMode() {
    document.body.style.backgroundColor = "#222";
    const paginas = document.getElementsByClassName("pagina");
    for (let pagina of paginas) {
        pagina.style.backgroundColor = "#333";
        pagina.style.color = "#eee";
    }
}

document.getElementById("button-darkmode").addEventListener("click", ativarDarkMode);

// === ROTEADOR ===

function Navega(rota) {
    root.innerHTML = "";

    const menu = Menu();
    let conteudo;

    if (rota === "/cadastro") {
        conteudo = PageCadastro();
    } else if (rota === "/lista") {
        conteudo = PageLista();
    } else {
        conteudo = document.createElement("p");
        conteudo.innerText = "Página não encontrada!";
    }

    root.append(menu, conteudo);
}

// Inicialização
Navega("/cadastro");
