var produtos=[
{id:0,nome:"X-Burger Clássico",preco:28.9,categoria:"Burgers",imagem:"imagens/xburguer.jpg",descricao:"Pão, carne e queijo derretido"},
{id:1,nome:"Bacon Duplo",preco:38,categoria:"Burgers",imagem:"imagens/bacon duplo.jpg",descricao:"Dois hambúrgueres com bacon crocante"},
{id:2,nome:"Batata Rústica",preco:19,categoria:"Porções",imagem:"imagens/batata.webp",descricao:"Batatas temperadas com alecrim"},
{id:3,nome:"Refrigerante 350ml",preco:7,categoria:"Bebidas",imagem:"imagens/refrigerante.jpg",descricao:"Lata gelada"},
{id:4,nome:"Brownie",preco:14.9,categoria:"Sobremesas",imagem:"imagens/brownie.jpg",descricao:"Chocolate com nozes"}
];
var categoriaAtual="Todos";

function mudarTema(){
document.body.classList.toggle("escuro");
if(document.body.classList.contains("escuro")){localStorage.setItem("tema","escuro")}
else{localStorage.setItem("tema","claro")}
}
if(localStorage.getItem("tema")=="escuro"){document.body.classList.add("escuro")}

function abrirMenu(){document.getElementById("menu").classList.toggle("aberto")}
function enviar(mensagem){alert(mensagem);return false}
function dinheiro(valor){return "R$ "+valor.toFixed(2).replace(".",",")}

function somenteNumeros(texto){return texto.replace(/\D/g,"")}
function mascaraCpf(campo){
var n=somenteNumeros(campo.value).slice(0,11);
n=n.replace(/(\d{3})(\d)/,"$1.$2").replace(/(\d{3})(\d)/,"$1.$2").replace(/(\d{3})(\d{1,2})$/,"$1-$2");
campo.value=n;
}
function mascaraTelefone(campo){
var n=somenteNumeros(campo.value).slice(0,11);
n=n.replace(/(\d{2})(\d)/,"($1) $2").replace(/(\d{5})(\d)/,"$1-$2");
campo.value=n;
}
function mascaraCep(campo){
var n=somenteNumeros(campo.value).slice(0,8);
campo.value=n.replace(/(\d{5})(\d)/,"$1-$2");
}

function buscar(evento){
var texto=document.getElementById("busca").value;
if(document.getElementById("listaProdutos")){mostrarProdutos()}
else if(evento.key=="Enter"){window.location="produtos.html?busca="+texto}
}
function filtrar(categoria){categoriaAtual=categoria;mostrarProdutos()}
function mostrarProdutos(){
var texto=document.getElementById("busca").value.toLowerCase();
var html="";
for(var i=0;i<produtos.length;i++){
var p=produtos[i];
if((categoriaAtual=="Todos"||p.categoria==categoriaAtual)&&p.nome.toLowerCase().indexOf(texto)>=0){
html+='<div class="produto"><img src="'+p.imagem+'" alt="'+p.nome+'"><h3>'+p.nome+'</h3><p>'+p.descricao+'</p><b>'+dinheiro(p.preco)+'</b><button class="botao" onclick="adicionar('+p.id+')">Adicionar</button></div>';
}
}
if(html==""){html="<p>Nenhum produto encontrado.</p>"}
document.getElementById("listaProdutos").innerHTML=html;
}

function pegarCarrinho(){return JSON.parse(localStorage.getItem("carrinho")||"[]")}
function salvarCarrinho(carrinho){localStorage.setItem("carrinho",JSON.stringify(carrinho))}
function adicionar(id){
var carrinho=pegarCarrinho();
var achou=false;
for(var i=0;i<carrinho.length;i++){
if(carrinho[i].id==id){carrinho[i].qtd++;achou=true}
}
if(!achou){carrinho.push({id:id,qtd:1})}
salvarCarrinho(carrinho);
alert("Produto adicionado ao carrinho");
}
function mudarQuantidade(posicao,valor){
var carrinho=pegarCarrinho();
carrinho[posicao].qtd+=valor;
if(carrinho[posicao].qtd<1){carrinho[posicao].qtd=1}
salvarCarrinho(carrinho);
mostrarCarrinho();
}
function remover(posicao){
var carrinho=pegarCarrinho();
carrinho.splice(posicao,1);
salvarCarrinho(carrinho);
mostrarCarrinho();
}
function mostrarCarrinho(){
var carrinho=pegarCarrinho();
var html="";
var subtotal=0;
for(var i=0;i<carrinho.length;i++){
var p=produtos[carrinho[i].id];
subtotal+=p.preco*carrinho[i].qtd;
html+='<div class="linha"><img src="'+p.imagem+'" alt="'+p.nome+'"><div class="espaco"><h3>'+p.nome+'</h3><p class="suave">'+dinheiro(p.preco)+'</p></div><button onclick="mudarQuantidade('+i+',-1)">-</button><b>'+carrinho[i].qtd+'</b><button onclick="mudarQuantidade('+i+',1)">+</button><button onclick="remover('+i+')">Remover</button></div>';
}
if(html==""){html="<p>Seu carrinho está vazio.</p>"}
var entrega=0;
if(carrinho.length>0){entrega=6}
document.getElementById("listaCarrinho").innerHTML=html;
document.getElementById("subtotal").innerHTML=dinheiro(subtotal);
document.getElementById("entrega").innerHTML=dinheiro(entrega);
document.getElementById("total").innerHTML=dinheiro(subtotal+entrega);
}
