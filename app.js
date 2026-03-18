
const produtos=[
"Doce de Banana Tradicional",
"Banana Diet",
"Doce de Banana com Canela"
];

function login(){

let u=document.getElementById("user").value;

document.getElementById("login").style.display="none";
document.getElementById("app").classList.remove("hidden");

if(u==="CG100"){

document.getElementById("btnDash").classList.remove("hidden");
openTab("dashboard");
carregarGrafico();

}else{

openTab("producao");

}

}

function openTab(id){

document.querySelectorAll(".tab").forEach(t=>t.classList.add("hidden"));

document.getElementById(id).classList.remove("hidden");

if(id==="estoque"){

carregarEstoque();

}

}

async function registrarProducao(){

let p=document.getElementById("prodProd").value;
let q=parseInt(document.getElementById("qtdProd").value);

await db.collection("historico").add({

tipo:"producao",
produto:p,
quantidade:q,
data:new Date()

});

alert("Produção registrada");

}

async function registrarVenda(){

let p=document.getElementById("prodVenda").value;
let q=parseInt(document.getElementById("qtdVenda").value);

await db.collection("historico").add({

tipo:"venda",
produto:p,
quantidade:q,
data:new Date()

});

alert("Venda registrada");

}

async function carregarEstoque(){

let dados=await db.collection("historico").get();

let estoque={};

produtos.forEach(p=>estoque[p]=0);

dados.forEach(doc=>{

let d=doc.data();

if(d.tipo==="producao"){

estoque[d.produto]+=d.quantidade;

}else{

estoque[d.produto]-=d.quantidade;

}

});

let html="";

for(let p in estoque){

html+=`<tr><td>${p}</td><td>${estoque[p]}</td></tr>`;

}

document.getElementById("estoqueTabela").innerHTML=html;

}

async function carregarGrafico(){

let dados=await db.collection("historico").get();

let estoque={};

produtos.forEach(p=>estoque[p]=0);

dados.forEach(doc=>{

let d=doc.data();

if(d.tipo==="producao"){

estoque[d.produto]+=d.quantidade;

}else{

estoque[d.produto]-=d.quantidade;

}

});

new Chart(document.getElementById("grafico"),{

type:"bar",
data:{

labels:Object.keys(estoque),
datasets:[{

label:"Estoque Atual",
data:Object.values(estoque)

}]

}

});

}
