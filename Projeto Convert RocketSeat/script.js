// Cotação de moedas do dia.
const USD = 4.87
const EUR = 5.32
const GBP = 6.08

// Obtendo os elementos do formulário.
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const currency = document.getElementById("currency")
const footer = document.querySelector("main footer")
const description = document.getElementById("description")
const result = document.getElementById("result")

// Manipulando o input amount para receber somente números.
amount.addEventListener("input", () => {
    const hasCharactersRegex = /\D+/g
    amount.value = amount.value.replace(hasCharactersRegex, "")
})

// Captando o evento de submit (enviar) do formulário.
form.onsubmit = (event) => {
    event.preventDefault()

    switch (currency.value) {
        case "USD":
            convertCurrency(amount.value, USD, "US$")
            break
        case "EUR":
            convertCurrency(amount.value, EUR, "€")
            break
        case "GBP": // Corrigido de "GPB" para "GBP"
            convertCurrency(amount.value, GBP, "£")
            break
        default:
            alert("Por favor, selecione uma moeda.")
            break
    }
}

// Função para converter a moeda.
function convertCurrency(amountValue, price, symbol) {
    try {
        // Exibindo a cotação da moeda selecionada formatada.
        // Ex: US$ 1 = R$ 4,87
        description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`

        // Calcula o total.
        let total = amountValue * price

        // Verifica se o resultado não é um número ou se o campo está vazio.
        if (isNaN(total) || amountValue === "") {
            footer.classList.remove("show-result")
            return alert("Por favor, digite o valor corretamente para converter.")
        }

        // Formatar o valor total e remover o "R$" para exibir apenas o número no H1.
        const formattedTotal = formatCurrencyBRL(total).replace("R$", "")

        // Exibe o resultado total.
        result.textContent = `${formattedTotal} Reais`

        // Aplica a classe que exibe o footer para mostrar o resultado.
        footer.classList.add("show-result")

    } catch (error) {
        console.error(error)
        
        // Remove a classe do footer em caso de erro.
        footer.classList.remove("show-result")
        alert("Não foi possível converter. Tente novamente mais tarde.")
    }
}

// Formata a moeda em Real Brasileiro.
function formatCurrencyBRL(value) {
    // Converte para número e utiliza o toLocaleString para formatar no padrão BRL.
    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })
}