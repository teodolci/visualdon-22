import * as d3 from 'd3'

// Import des données
import data from '../data/countries.geojson'

// // EXERCICE 1

d3.select("body")
    .append("h1")
    .text("Exercice 1")

const ex1 = d3.select('body').append('svg')
    .attr('width', 100)
    .attr('height', 100)

// for (let i = 0; i < 10; i++) {
//     for (let j = 0; j < 10; j++) {
//         ex1.append('rect')
//             .attr('width', 10)
//             .attr('height', 10)
//             .attr('x', i * 10)
//             .attr('y', j * 10)
//             .attr('fill', '#ffffff')
//             .attr('stroke', '#000000')
//             .attr('stroke-width', 0.5)
//     }
// }
// Polyline = une ligne avec plusieurs points d'encrage.
ex1.append('polyline')
    .attr('points', '20,10 20,70 70,70 70,10 30,10 30,60 60,60 60,30 40,30 40,50 50,50 50,40')
    .attr('stroke', '#000000')
    .attr('stroke-width', 4)
    .attr('fill', 'none')

ex1.append('circle')
    .attr('cx', 50)
    .attr('cy', 40)
    .attr('r', 5)
    .attr('fill', 'red')
    .attr('stroke', 'none')

// // Exercice 2

d3.select("body")
    .append("h1")
    .text("Exercice 2")

const ex2 = d3.select('body').append('div')

// Filtre les données qui ont une population plus grandes que 1’000’000 (POP2005)
const popBiggerThanMio = data.features.filter(country => country.properties.POP2005 > 1000000)


// Sort la moyenne de la population par continent
const getContinentAvg = (name, regionNb) => {
    const regionCountries = popBiggerThanMio.filter(country => country.properties.REGION == regionNb)

    const countryNb = regionCountries.length
    const totalPop = regionCountries.reduce((acc, curr) => acc + curr.properties.POP2005, 0)

    return {
        name: name,
        popAvg: Math.round(totalPop / countryNb)
    }
}

// Crée un tableau d'objets avec les noms et populations moyenne de chaque continent
const continentAvgs = [
    getContinentAvg('Europe', 150),
    getContinentAvg('Asie', 142),
    getContinentAvg('Afrique', 2),
    getContinentAvg('Océanie', 9),
    getContinentAvg('Amériques', 19)
]

// trie le tableau de la valeur la plus grande à la plus petite
continentAvgs.sort((a, b) => b.popAvg - a.popAvg)

// Affiche le titre
ex2.append('h2').text('Population moyenne par continent')

// Affiche les données obtenues et formatte les miliers avec des apostrophes
continentAvgs.forEach(continent => {
    ex2.append('p').text(`${continent.name} : ${continent.popAvg.toLocaleString('de-CH')}`)
});

// Ou alors utiliser la fonction suivante :
// function qui ajoute le séparateur de milliers
function addSeparator(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
}

popBiggerThanMio.forEach(pays => {
    console.log(pays.properties.NAME + ' (' + (pays.properties.REGION == 150 ? "Europe" : "") + (pays.properties.REGION == 2 ? "Afrique" : "") + (pays.properties.REGION == 142 ? "Asie" : "") + (pays.properties.REGION == 9 ? "Oceanie" : "") + (pays.properties.REGION == 19 ? "Amérique" : "") + ') : ' + addSeparator(pays.properties.POP2005) + ' habitants')
});

// Exercice 3 - MAP

// .range(["white", `#${Math.floor(Math.random()*16777215).toString(16)}`])

const ex3 = d3.select('body').append('div').attr('id', 'ex3')


const mapMargin = { top: 30, right: 0, bottom: 0, left: 0 },
    mapWidth = 1000 - mapMargin.left - mapMargin.right,
    mapHeight = 800 - mapMargin.top - mapMargin.bottom

// Ajoute le svg
const svg1 = d3.select('#ex3').append('div').attr('class', 'map')
    .append('svg')
    .attr('width', mapWidth)
    .attr('height', mapHeight)

// Carte et projection
const path = d3.geoPath();
const projection = d3.geoMercator()
    .scale(130)
    .center([0, 20])
    .translate([mapWidth / 2, mapHeight / 2]);

let aRandomNb = Math.floor(Math.random() * 6);
let aRandomScheme;
switch (aRandomNb) {
    case 0:
        aRandomScheme = d3.schemeOranges;
        break;
    case 1:
        aRandomScheme = d3.schemeGreens;
        break;
    case 2:
        aRandomScheme = d3.schemeReds;
        break;
    case 3:
        aRandomScheme = d3.schemeBlues;
        break;
    case 4:
        aRandomScheme = d3.schemeGreys;
        break;
    case 5:
        aRandomScheme = d3.schemePurples;
        break;
}

// Définit l'échelle de couleurs
const colorScale = d3.scaleThreshold()
    .domain([100000, 1000000, 10000000, 30000000, 100000000, 500000000])
    .range(aRandomScheme[7]);

// Charge les données externes (la carte)
d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then(mapData => {

    // Crée un tooltip qui est caché par défaut
    const tooltip =  d3.select('#ex3').append('div').attr('class', 'map')
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("position", "fixed") // important si on veut pas qu'il se foute n'importe où
        .style("display", "block")
        .style("z-index", "9999")
        .style("background-color", "black")
        .style("border-radius", "5px")
        .style("padding", "10px")
        .style("color", "white")

    // Crée 3 fonctions qui affiche/cache le tooltip
    const mouseover = (event, d) => {
        tooltip.style("opacity", 1)
    }

    const mousemove = (event, d) => {
        tooltip
            .html(`${d.properties.name}<br>${(d.pop).toLocaleString('de-CH')}`)
            .style("left", (event.x) - 70 + "px")
            .style("top", (event.y) - 70 + "px")
    }

    const mouseleave = (event, d) => {
        tooltip.style("opacity", 0)
    }

    // Dessine la carte
    svg1.append("g")
        .selectAll("path")
        .data(mapData.features)
        .join("path")

        // Dessine chaque pays
        .attr("d", d3.geoPath()
            .projection(projection)
        )
        // Ajoute la bonne couleur de chaque pays
        .attr("fill", d => {
            const country = data.features.find(country => country.properties.ISO3 == d.id);
            d.pop = country ? country.properties.POP2005 : 0;
            return colorScale(d.pop);
        })
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)

    // Ajoute le titre du graphe
    svg1.append('text')
        .attr('text-anchor', 'center')
        .attr('x', mapWidth / 2)
        .attr('y', mapMargin.top)
        .text('Carte choroplète')
})

// Exercice 3 - Graphe
// Défini les dimensions et marges du graphe
const graphMargin = { top: 20, right: 30, bottom: 40, left: 90 },
    graphWidth = 600 - graphMargin.left - graphMargin.right,
    graphHeight = 400 - graphMargin.top - graphMargin.bottom;

// Ajoute le svg à la div .graph
const svg2 = d3.select('#ex3').append('div').attr('class', 'graph')
    .append("svg")
    .attr("width", graphWidth + graphMargin.left + graphMargin.right)
    .attr("height", graphHeight + graphMargin.top + graphMargin.bottom)
    .append("g")
    .attr("transform", `translate(${graphMargin.left}, ${graphMargin.top})`);

// Ajoute l'axe X
const x = d3.scaleLinear()
    .domain([0, d3.max(continentAvgs, d => d.popAvg)])
    .range([0, graphWidth]);
svg2.append("g")
    .attr("transform", `translate(0, ${graphHeight})`)
    .call(d3.axisBottom(x).tickFormat(d3.format('~s')))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

// Ajoute l'axe Y
const y = d3.scaleBand()
    .range([0, graphHeight])
    .domain(continentAvgs.map(d => d.name))
    .padding(.1);
svg2.append("g")
    .call(d3.axisLeft(y))

// Crée un tooltip qui est caché par défaut
const tooltip = d3.select('#ex3').append('div').attr('class', 'graph')
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("position", "fixed")
    .style("display", "block")
    .style("z-index", "9999")
    .style("background-color", "black")
    .style("border-radius", "5px")
    .style("padding", "10px")
    .style("color", "white")

// Crée 3 fonctions qui affiche/cache le tooltip
const mouseover = (event, d) => {
    tooltip.style("opacity", 1)
}

const mousemove = (event, d) => {
    tooltip
        .html(`${d.name}<br>${(d.popAvg).toLocaleString('de-CH')}`)
        .style("left", (event.x) - 70 + "px")
        .style("top", (event.y) - 70 + "px")
}

const mouseleave = (event, d) => {
    tooltip.style("opacity", 0)
}

//Barres
svg2.selectAll("myRect")
    .data(continentAvgs)
    .join("rect")
    .transition() // petite transition lors du chargement
    .duration(1000)
    .attr("x", x(0))
    .attr("y", d => y(d.name))
    .attr("width", d => x(d.popAvg))
    .attr("height", y.bandwidth())
    .attr("fill", `#${Math.floor(Math.random()*16777215).toString(16)}`)

// Ajoute les events après car sinon bug avec la transition
svg2.selectAll("rect")
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)

// Exercice 4

// import puppeteer from "puppeteer";

// (async () => {
//     // Lance le browser
//     const browser = await puppeteer.launch()
//     //Ouvre une nouvelle page
//     const page = await browser.newPage()
//     //Va au lien choisi
//     await page.goto('https://heig-vd.ch/formations/bachelor/filieres')

//     // Fait un screenshot
//     await page.screenshot({ path: 'images/heig-vd_filieres.png' });

//     // Crée un tableau vide pour les filières
//     const pathwayList = []

//     // Récupère les lignes du tableau des filières
//     const pathways = await page.$$('#liste-formations tbody tr')

//     for (let el of pathways) {

//         // Défini la filière et le nb d'orientations, si on est sur la bonne ligne
//         const program = await el.evaluate(el => {
//             const pathwayEl = el.querySelector('.prog')
//             if (!pathwayEl) return

//             const pathway = pathwayEl.textContent
//             const rowspan = pathwayEl.getAttribute('rowspan') // attr qui défini le nombre de ligne pour une filière
//             const courseNb = rowspan ? rowspan : '1'

//             return {pathway, courseNb}
//         })

//         // N'ajoute la filière que si elle existe
//         if (program) pathwayList.push(program)
//     }

//     // Affiche les filières dans le terminal
//     console.table(pathwayList)

//     // Ferme le browser
//     await browser.close()
// })()