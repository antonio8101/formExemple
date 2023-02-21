/* function PersonCostructor(name, age, city){
    this.nome = name;
    this.età = age;
    this.città = city || ""
}

personsList = [
]

function populationFromPersonList(argument){
    
    if(argument instanceof Array){

        const parentElement = document.getElementById("persons-list");
        parentElement.innerHTML = "";

        argument.sort((a,b) => a.età - b.età)

        argument.forEach((personsListElement) => {
            const newDivName_City = document.createElement("div");

            if(personsListElement.città.length > 0){
                newDivName_City.innerHTML =  personsListElement.nome + " (" + personsListElement.città + ")";
            }
            else{
                newDivName_City.innerHTML =  personsListElement.nome;
            }

            const newDivAge = document.createElement("div");
            newDivAge.setAttribute("class", "ms-auto me-1");
            newDivAge.innerHTML = personsListElement.età + " anni";
            
            const newLi = document.createElement("li");
            newLi.setAttribute("class", "list-group-item d-flex")
            newLi.appendChild(newDivName_City);
            newLi.appendChild(newDivAge)

            parentElement.appendChild(newLi);
        })
    }
}
populationFromPersonList(personsList)


const form0 = document.forms.item(0);
form0.addEventListener("submit", (evento) => {
    evento.preventDefault();
    evento.stopPropagation();

    const nome = form0.elements[0].value;
    const età = form0.elements[1].value;
    const città = form0.elements[2].value

    personsList.push(new PersonCostructor(nome, età, città));
    populationFromPersonList(personsList);

    form0.reset()

}) */

function ConstrucorPersons(name, age, city){
    this.name = name;
    this.age = age;
    this.city = city;
}

const personsList = []

function printPerson(personList){
    if(personList instanceof Array){
        parentUlElement = document.getElementById("persons-list");

        const createContent = (argument) => {
                                string = "";
                                string += '<li class="list-group-item d-flex"> ';
                                string += "<div>" + argument.name;
                                string += (argument.city.length > 0) ? ( " (" + argument.city +")" ) : "";
                                string += "</div>";
                                string += '<div class="ms-auto">' + argument.age + ' anni' + '</div>';
                                string += "</li>";
                                return string;
                                }

        parentUlElement.innerHTML = personList
                                            .sort((a,b) => a.age - b.age)
                                            .map(createContent)
                                            .join("")
    }
}


function selectPerson(argument){
    if(argument instanceof Array){
        const form1 = document.forms.item(0);
        const targetForm1 = form1.elements.item(0);
        console.log(targetForm1)
    
        const createSelectPerson = ((value) => {
            string = "";
            string += "<option>";
            string += value.name;
            string += "</option>";
        })
        targetForm1.innerHTML = argument
                                        .sort((a,b) => a.age - b.age)
                                        .map(createSelectPerson)
                                        .join("")
    }
}

const form0 = document.forms.item(0);
form0.addEventListener("submit", (evento) =>
{   evento.preventDefault();
    evento.preventDefault();
    let name = form0.elements[0].value;
    let age = form0.elements[1].value;
    let city = form0.elements[2].value;

    personsList.push(new ConstrucorPersons(name, age, city));
    printPerson(personsList);
    selectPerson(personsList);
    form0.reset();
})