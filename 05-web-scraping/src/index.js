import jsdom from "jsdom";
import fetch from "isomorphic-fetch"
import puppeteer from "puppeteer"



(async () => {
    try {

        /* Décommenter la partie souhaitée  */

        /* PARTIE 1 */
        /* Faire une capture d'écran de la page des cantons Wikipédia */

        // const browser = await puppeteer.launch({
        //     headless: true,
        //     executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        //     defaultViewport: { width: 1920, height: 1720 }
        // });

        // const page = await browser.newPage();
        // await page.goto('https://fr.wikipedia.org/wiki/Canton_(Suisse)#Données_cantonales');
        // await page.screenshot({ path: 'images/screenshot_Cantons.png' });
        // await browser.close();

        /* FIN DE PARTIE 1 */

        /* PARTIE 2 */
        /* Récupération des données */
        /* Pour les exercices suivants, vous pouvez choisir n'importe quelle libraries que l'on a vues en cours ! */

        // const browser = await puppeteer.launch();
        // const page = await browser.newPage();
        // await page.goto('https://fr.wikipedia.org/wiki/Canton_(Suisse)#Données_cantonales');

        // const datas = await page.$$eval('table tr', rangs => {
        //     return Array.from(rangs, rang => {
        //         const colonnes = rang.querySelectorAll('td');
        //         return Array.from(colonnes, colonne => colonne.innerText);
        //     });
        // });

        // let table = [];
        // for (let i = 2; i < 28; i++) {
        //     table.push([datas[i][0], datas[i][3]]);
        // }

        // for (let i = 0; i < 26; i++) {
        //     let nom = table[i][0];
        //     if (nom.includes('\n')) {
        //         nom = nom.replace('\n', ' – ')
        //         nom = nom.replace('(', '');
        //         nom = nom.replace(')', '');
        //         if (nom.includes(',')) {
        //             nom = nom.replace(',', ' -')
        //             if (nom.includes(',')) {
        //                 nom = nom.replace(',', ' –')
        //             }
        //         }
        //     }
        //     table[i][0] = nom;
        //     table[i][1] = table[i][1].replaceAll(/\s/g, ''); // Supprime les espaces des nombres
        //     table[i][1] = parseInt(table[i][1]) // Transforme en integer
        // }

        // console.log('Voici tous les noms de cantons et les populations respectives :');
        // console.log(table); // ou console.table(table)

        /* FIN DE PARTIE 2 */

        /* PARTIE 3 */
        /* Webscraper un site e-commerce */
        /* Allez à ce lien et construisez la liste d'objets */
        /* le lien : https://www.webscraper.io/test-sites/e-commerce/allinone/computers/laptops */

        //         const browser = await puppeteer.launch();
        //         const page = await browser.newPage();
        //         await page.goto('https://www.webscraper.io/test-sites/e-commerce/allinone/computers/laptops');

        //         let liste = [];
        //         let div = await page.$$('div.thumbnail')
        //         for (let elm of div) {
        //             let produit = await elm.$eval('.title', el => el.textContent);
        //             let prix = await elm.$eval('.price', el => el.textContent);
        //             let etoiles = await elm.$eval('.ratings :nth-child(2)', el => el.getAttribute('data-rating'));
        //             etoiles = parseInt(etoiles);

        //             let unProduit = {
        //                 produit: produit,
        //                 prix: prix,
        //                 etoiles: etoiles
        //             }
        //             liste.push(unProduit);
        //         }

        //         console.dir(liste, { 'maxArrayLength': null });

        /* FIN DE PARTIE 3 */

    } catch (error) {
        console.log('Et merde.', error);
    }
})();
