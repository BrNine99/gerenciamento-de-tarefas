// Selecionar a lista de tarefas
const tarefas = document.getElementById("listaTarefas");

// Fazer uma requisição GET para a API externa buscar todas as tarefas
fetch("https://ca2d67fe666ae5774e30.free.beeceptor.com/api/users")
.then(resposta => resposta.json()) // Converte o corpo da resposta em JSON
.then((listaDeTarefas) => {
    // Itera sobre cada tarefa do array
    listaDeTarefas.forEach(tarefa => {
        // Criar um nome elemento de lista para cada tarefa
        const item = document.createElement("li");
        // Associa o ID da tarefa ao elemento HTML.
        item.dataset.id = tarefa.id;
        // Adiciona a descrição da tarefa
        item.textContent = tarefa.descricao;

        // Cria o botão de exclusão
        const botaoRemover = document.createElement("button");
        // Define o texto do botão
        botaoRemover.textContent = "X";
        // Adiciona o evento de clique
        botaoRemover.addEventListener("click", () => {
            remove(tarefa.id);
        });
        // Adiciona o botão ao item
        item.appendChild(botaoRemover);

        // Adiciona o novo item à lista de tarefas no HTML
        tarefas.appendChild(item);
    });
});

// Adiciona um ouvinte de evento click no botao "adicionar"
document.getElementById("add").addEventListener("click", () =>{
    // Pega a descrição do input com ID 
    const descricao = document.getElementById("tarefa").value;
    // Faz uma requisição POST para a API externa para criar a tarefa
    fetch("https://ca2d67fe666ae5774e30.free.beeceptor.com/api/users", {
        // Definimos o metodo
        method: "POST",
        // Define cabeçalho da requisicao com o tipo do conteudo
        headers: {
            "Content-Type": "application/json"
        },
        // Convertemos um objeto JS para uma string JSON e passamos no corpo
        body: JSON.stringify({descricao: descricao})
    })
    .then(resposta => resposta.json())
    .then(tarefa => {
        // Criar um nome elemento de lista para cada tarefa
        const item = document.createElement("li");
        // Associa o ID da tarefa ao elemento HTML.
        item.dataset.id = tarefa.id;
        // Adiciona a descrição da tarefa
        item.textContent = tarefa.descricao;

        // Cria o botão de exclusão
        const botaoRemover = document.createElement("button");
        // Define o texto do botão
        botaoRemover.textContent = "X";
        // Adiciona o evento de clique
        botaoRemover.addEventListener("click", () => {
            remove(tarefa.id);
        });
        // Adiciona o botão ao item
        item.appendChild(botaoRemover);

        // Adiciona o novo item à lista de tarefas no HTML
        tarefas.appendChild(item);
    })
})

// Função responsável por remover uma tarefa da API e da interface
function remove(id) {
    // Faz uma requisição HTTP DELETE para excluir a tarefa pelo ID
    fetch(`https://ca2d67fe666ae5774e30.free.beeceptor.com/api/users/${id}`, {
        method: "DELETE"
    })

    // Recebe a resposta HTTP enviada pelo servidor
    .then(resposta => {
        // Verifica se a requisição não foi bem-sucedida
        if (!resposta.ok) {
            // Lança um erro com o status HTTP retornado
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }
        // Localiza no HTML o elemento <li> que possui o ID da tarefa
        const item = document.querySelector(
            `#listaTarefas li[data-id="${id}"]`
        );

        // Remove o elemento da interface, caso ele exista
        item?.remove();

        // Exibe uma mensagem de sucesso no console
        console.log("Tarefa removida com sucesso!");
    })

    // Captura erros de rede ou erros lançados durante a execução
    .catch(erro => {
        // Exibe os detalhes do erro no console
        console.error("Erro ao remover tarefa:", erro);

        // Informa ao usuário que a exclusão não foi concluída
        alert("Não foi possível remover a tarefa.");
    });
}