import * as d3 from 'd3';

// C'est ici que vous allez écrire les premières lignes en d3!

// Créez 3 cercles de 40px de rayon et placez-les respectivement à : (50,50), (150,150), (250,250)

d3.select("body")
    .append("svg")
    .attr("class", "svg-circle")
    .attr("width", 300)
    .attr("height", 400)

d3.select(".svg-circle")
    .append("circle")
    .attr("id", "circle1")
    .attr("cx", 50)
    .attr("cy", 50)
    .attr("r", 40)

d3.select(".svg-circle")
    .append("circle")
    .attr("id", "circle2")
    .attr("cx", 150)
    .attr("cy", 150)
    .attr("r", 40)

d3.select(".svg-circle")
    .append("circle")
    .attr("id", "circle3")
    .attr("cx", 250)
    .attr("cy", 250)
    .attr("r", 40)

// Changez la couleur du deuxième cercle

d3.select("#circle2")
    .attr("fill", "red")

// Déplacez de 50px vers la droite le premier et le deuxième cercle 

d3.select("#circle1")
    .attr("transform", "translate(50, 0)")

d3.select("#circle2")
    .attr("transform", "translate(50, 0)")

// Rajoutez du texte en dessous de chaque cercle

d3.selectAll('circle')
    .each(function(){
    d3.select(this.parentNode).append("text")
    .text('Circle')
    .attr("x",d3.select(this.parentNode).node().getBBox().width-60)
    .attr("y",d3.select(this.parentNode).node().getBBox().height)
})

// Alignez verticalement les cercles en cliquant sur le dernier cercle

let cxCircle2 = d3.select("#circle2").attr("cx");
// const cercle3 = d3.select("#circle3")
d3.select("#circle3").on("click", () => {
    d3.select("#circle1")
        .attr("cx", cxCircle2)
        .attr("transform", "translate(0, 0)")
    d3.select("#circle2")
        .attr("transform", "translate(0, 0)")
    d3.select("#circle3")
        .attr("cx", cxCircle2)
        .attr("transform", "translate(0, 0)")
})

// Vous avez à disposition les données suivantes: ```[20, 5, 25, 8, 15]```
// 
// Ces données représentent la hauteur des rectangles que vous allez dessiner avec la méthode ```data(data).enter()``` 
// que nous avons vue en cours. Les rectangles auront une largeur fixe de 20px et doivent être alignés en bas 
// l'un à côté de l'autre (comme un graphique en batons ! :bar_chart: )

const data = [20, 5, 25, 8, 15]

d3.select("body")
    .append("div")
    .attr("class", "div-rect")

const svgRect = d3.select(".div-rect")
    .append("svg")
    .attr("class", "svg-rect")
    .attr("width", 300)
    .attr("height", 300)

svgRect.selectAll(".svg-rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "rects")
    .attr("x", (d, i) => i * 30)
    .attr("y", (d, i) => parseInt(svgRect.attr("height")) - d)
    .attr("width", 20)
    .attr("height", (d => d))

// console.log(svgRect.attr("height"));

