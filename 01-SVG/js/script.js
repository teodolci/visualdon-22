let rectangle = document.getElementById("rectOnClick");
let donut = document.getElementById("donut");

rectangle.onclick = function(){
    if (rectangle.style.fill == "blue") {
        rectangle.style.fill = "red";
    } else {
        rectangle.style.fill = "blue";
    }
};

donut.addEventListener('mouseenter', evt => {
    donut.querySelector(".extDonut").setAttribute("r", 70);
})

donut.addEventListener('mouseleave', evt => {
    donut.querySelector(".extDonut").setAttribute("r", 60);
})

// donut.addEventListener('mouseover', evt => {
//         evt = evt.target;
//         console.log(evt);
//         /* donut.setAttribute("r","100") */
//         donut.classList.toggle('changerayon')
// })