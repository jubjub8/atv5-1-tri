async function buscarCEP() {
    const uf = document.getElementById('uf').value.trim();
    const cidade = document.getElementById('cidade').value.trim();
    const rua = document.getElementById('rua').value.trim();
    const resultadoDiv = document.getElementById('resultado');

    // Validação básica
    if (uf.length !== 2 || cidade.length < 3 || rua.length < 3) {
        alert("Por favor, preencha todos os campos corretamente. (A cidade e a rua precisam de pelo menos 3 caracteres)");
        return;
    }

    resultadoDiv.innerHTML = "Buscando...";

    try {
        // A URL da API para busca por endereço é: viacep.com.br/ws/UF/CIDADE/RUA/json/
        const url = `https://viacep.com.br/ws/${uf}/${cidade}/${rua}/json/`;
        const response = await fetch(url);
        const dados = await response.json();

        if (dados.length === 0) {
            resultadoDiv.innerHTML = "<p>Nenhum CEP encontrado para este endereço.</p>";
            return;
        }

        // Limpa e exibe os resultados (pode retornar mais de um CEP caso a rua seja longa)
        resultadoDiv.innerHTML = `<h3>Resultados encontrados:</h3>`;
        
        dados.forEach(item => {
            resultadoDiv.innerHTML += `
                <div class="cep-item">
                    <strong>CEP: ${item.cep}</strong><br>
                    ${item.logradouro}<br>
                    ${item.bairro} - ${item.localidade}/${item.uf}
                </div>
            `;
        });

    } catch (error) {
        resultadoDiv.innerHTML = "<p>Erro ao consultar o servidor. Tente novamente mais tarde.</p>";
        console.error(error);
    }
}