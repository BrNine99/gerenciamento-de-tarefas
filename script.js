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
        // Define conteudo HTML do item, incluindo descrição e botão
        item.innerHTML = `${tarefa.descricao} <button>X</button>`
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
        // Define conteudo HTML do item, incluindo descrição e botão
        item.innerHTML = `${tarefa.descricao} <button>X</button>`
        // Adiciona o novo item à lista de tarefas no HTML
        tarefas.appendChild(item);
    })
})