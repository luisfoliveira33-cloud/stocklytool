
const produtos=[
"Doce de Banana Tradicional",
"Banana Diet",
"Doce de Banana com Canela"
];

function login(){

let u=document.getElementById("user").value;

document.getElementById("loginPage").style.display="none";
document.getElementById("app").classList.remove("hidden");

if(u==="CG100"){

document.getElementById("dashboard").classList.remove("hidden");
carregarGrafico();

}else if(u==="FG100"){

document.getElementById("menuFG").classList.remove("hidden");
openTab("producao");

}

}

function openTab(id){

document.querySelectorAll(".page").forEach(p=>p.classList.add("hidden"));

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
label:"Quantidade em Estoque",
data:Object.values(estoque)
}]
}
});

}
