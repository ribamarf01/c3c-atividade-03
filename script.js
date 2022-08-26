function calcularTriangulo() {
	// Variaveis pegam os valores dos inputs no HTML
	const lado1 = Number(document.getElementById("lado_1").value)
	const lado2 = Number(document.getElementById("lado_2").value)
	const lado3 = Number(document.getElementById("lado_3").value)

	// Resposta prepara o lugar aonde sera colocado a resposta
	const resposta = document.getElementById("resposta_1")

	if(lado1 === lado2 && lado2 === lado3) { // Testa se todos os lados são iguais
		resposta.innerHTML = "Equilátero: Os três lados são iguais."
	} else if(lado1 === lado2 || lado2 === lado3 || lado3 === lado1) { // Testa se o triangulo possui dois lados iguais, não precisa testar se são todos iguais pois foi testado anteriormente
		resposta.innerHTML = "Isósceles: Dois lados iguais."
	} else { // Esgotado as opções, é tido que são 3 lados diferentes
		resposta.innerHTML = "Escaleno: Todos os lados são diferentes."
	}

}

function calcularRaizes() {
	// Variaveis pegam os valores dos inputs no HTML
	const a = Number(document.getElementById("a").value)
	const b = Number(document.getElementById("b").value)
	const c = Number(document.getElementById("c").value)

	// Resposta prepara o lugar aonde sera colocado a resposta
	const resposta = document.getElementById("resposta_2")

	// A resposta é dada de acordo com a função bhaskara pedida, que recebe 3 argumentos: a, b e c
	resposta.innerHTML = bhaskara(a, b, c)

}

function bhaskara(a, b, c) {

	// Calcula o delta, Delta = b² - 4 * a * c
	const delta = (b * b) - (4 * a * c)
	
	// Se o delta for negativo, retorna mais cedo, visto que não é possível continuar
	if(delta < 0) return "Delta é negativo"

	// Faz xlinha e xlinhalinha
	// X' = -b + raiz(delta) / 2 * a
	// X'' = -b - raiz(delta) / 2 * a
	const raiz1 = (-b + Math.sqrt(delta)) / (2 * a)
	const raiz2 = (-b - Math.sqrt(delta)) / (2 * a)

	// Retorna o resultado como array
	// Como a questão pedia um array retornado, junto ao texto fiz um novo array com as variáveis pedidas
	return `As raizes são ${[raiz1, raiz2]}`
}

function calcularNota() {
	// Variaveis pegam os valores dos inputs no HTML
	const nota = Number(document.getElementById("nota").value)

	// Resposta prepara o lugar aonde sera colocado a resposta
	const resposta = document.getElementById("resposta_3")

	// Checa quanto é necessário para arredondar para o divisor de 5 mais próximo
	// A função round tenta arredondar pra cima o valor.
	// Como nota/5 é um valor fracionário, multiplica por 5 novamente para saber qual é o número inteiro multiplo de 5, e faz a subtração para saber quanto falta para a nota chegar nele.
	const arredondamentoNecessario = Math.round(nota / 5) * 5 - nota

	// Um dos problemas da função round, é que apesar de arredondar pra cima, caso o número siga a regra de arredondamento para baixo ele ira fazer;
	// Com isso, uma nota de 57 pode diminuir pra um valor negativo;
	// Para evitar problemas, a linha a seguir faz com que caso exista um valor negativo em arredondamentoNecessario, ele ira ser 0
	// Isso faz com que uma nota 37 continue 37 por exemplo, ao inves de virar 35
	const notaArredondada = arredondamentoNecessario > 0 ? arredondamentoNecessario : 0

	// Checa se a nota necessária para passar foi menor que 3 e
	// Checa se a nota junto ao arredondamento vai ser necessário para o aluno passar
	if(notaArredondada < 3 && notaArredondada + nota >= 40) {
		resposta.innerHTML = `Aprovado com nota ${notaArredondada + nota}` // Caso o aluno passe
	} else {
		resposta.innerHTML = `Não aprovado. Sua nota foi ${nota}` // Caso o aluno reprove (Nota inalterada)
	}

}

function trocarValores() {
	// Variaveis pegam os valores dos inputs no HTML
	const numeroAlvo = Number(document.getElementById("alvo").value)

	// Resposta prepara o lugar aonde sera colocado a resposta
	const resposta = document.getElementById("resposta_4")

	// Por problemas de arrays quebrando o layout, optei por usar uma lista desordenada (O array continua, de outra forma)
	// Essa linha serve para que novas chamadas na função apaguem o valor anterior dentro do elemento
	// Como serão colocados elementos do tipo li mais a frente, eles não irão se sobrepor e sim se adicionar em uma so lista
	// Isso impede esse comportamento
	resposta.innerHTML = ""

	// array gerado pela função luidyMoura de acordo com o número passado no input
	const lista = luidyMoura(numeroAlvo)
	
	// Pega cada item da lista, cria um elemento li e atribui a esse item, então joga ele na lista de resposta
	for(let i = 0; i < numeroAlvo; i++) {
		const li = document.createElement('li')
		li.innerHTML = lista[i]
		resposta.appendChild(li)
	}

}

function luidyMoura(n) {
	
	// Array que vai ser usado para por os elementos
	// É um array de string pois se adequa melhor a função
	const lista = []

	// Percorre todos os elementos até antes de N+1
	for(let i = 1; i <= n; i++) {

		// Essa questão pode ser feita esgotando as possibilidades, mas com string fica mais fácil
		// Uma variável string vazia
		// Essa string sempre sera vazia no inicio do loop
		let str = ""

		// Caso divisível por 5 ou 9, concatena a string Luidy ou Moura, ou ambas
		// Como são dois se, e não estão um no bloco de outro, eles não impedem a execução do outro
		if(i % 5 === 0) str += "Luidy"
		if(i % 9 === 0) str += "Moura"

		// Caso os se não concatenem nada, a string vai ter tamanho 0
		// Sendo assim, põe-se o número no formato de string para dentro dela
		if(str.length === 0) str += "" + i

		// Adiciona a nova string na lista
		// Como está fora do for, a lista é atualizada fora dele
		lista.push(str)
		
	}

	// Retorna o array com os itens
	return lista

}