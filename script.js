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