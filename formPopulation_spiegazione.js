//i form sono famiglie di elementi che trasmettono dati
/*vi è un elemento contenitore form, input e button
API form si trovano in document.forms, ritorna HTMLCollection*/

/*
var selectForm = document.forms[index]
var selectFormElement = document.forms[index].elements[index]
*/

//senza specificare dove inviare le info il form invia a se stesso
/*action è dove method di chiamata è come*/





                                            //ESERCIZIO

/*
Creare un programma che permetta di inserire una lista di persone (istanza della classe Person)
- array di persone - person (istanza della classe);
- una stringa - name
- le persone devono essere visualizzate all'interno di una lista sulla pagina html con
nome/età ordinati secondo età
- un primo form deve consentire l'aggiunta di altre persone
- un secondo form deve consentire di selezionare una delle persone inserite per incrementare l'età
 di un anno
 - la lista delle persone dev'essere aggiornata ogni volta che viene inserita
 una nuova persona e al variare dell'età di uno dei membri già presenti
*/
class Person{
    constructor(name, age, city){  // city = "" qualora indefinita vine stampata la stringa vuota
        this.name = name;
        this.age = age;
        this.city = city || "";
    }
}

//potrebbe anche essere un costruttore
/* function Person (name, age, city){
    this.name = name;
    this.age = age;
    this.city = city || "";
} */

const persons = [
    new Person ("Test1", 34, "Città1"),
    new Person ("Test3", 24, "Città2"),
    new Person ("Test4", 14, "Città3"),
];

//PARTE 1
//codice 1
/* function printPersonsList1(argument){

    //if è un controllo di sicurezza
    //value è l'elemento che è all'interno del valore passsato (in questo caso dell'array persons)
    if(argument instanceof Array){
        //seleziona l'elemento ul
        let ulParent = document.getElementById("persons-list")
        //dispone l'argomento passato in ordine numerico crescente
        argument.sort((a, b) => a.age - b.age)

         //rimuve il contenuto prima diu aggiungere i nuovi elementi
        //meglio fuori dal metodo forEach() perché la esegue prima di entrare nel metodo
        ulParent.innerHTML = "";
        
        argument.forEach((value) => {
            //crea nuovi elementi li e div
            let newLi = document.createElement("li");
            newDivAge = document.createElement("div");
            newDivName_City = document.createElement("div");
            //setta gli attributi dei nuovi elementi creati
            newLi.setAttribute("class", "list-group-item d-flex");
            newDivAge.setAttribute("class", "ms-auto me-1");
            //stampa nei relativi div i valori richiamati
            newDivAge.innerHTML = value.age + " anni";
            newDivName_City.innerHTML = `${value.name} ${value.city}`;
            //appende gli elementi figli
            newLi.appendChild(newDivName_City);
            newLi.appendChild(newDivAge);
            //appende ad ogni ciclo il nuovo li contenente i div creati
            ulParent.appendChild(newLi);
            
            })
        }
} */
//printPersonsList1(persons)


//codice 2
/* function printPersonsList2(argument){

    //controllo di sicurezza
    if(argument instanceof Array){

        //seleziona l'elemento ul
        const ulParent = document.getElementById("persons-list");

        //imposta in ordine crescente le età
        argument.sort((a, b) => a.age - b.age)

        //mappa gli argomenti passati
        const argumentMap = argument.map((parametri) => {
            
            //genera una stringa contenente tutti gli elementi necessari (attributi compresi)
            let stringa = "";
            stringa += '<li class="list-group-item d-flex">';
            stringa += '<div>' + parametri.name + " - " + parametri.city + '</div>';
            stringa += '<div class = "ms-auto">' + parametri.age + ' anni </div>';
            stringa += '</li>';
            return stringa;

        }).join("");

        ulParent.innerHTML = argumentMap;
    }
}
printPersonsList2(persons) */
    

//codice 3 (con template string si può evitare di mischiare JS con HTML nella generazione di string)
function printPersonsList3(argument){

    //controllo di sicurezza
    if(argument instanceof Array){
        const ulParent = document.getElementById("persons-list");

        //argument.sort((a,b) => a.age - b.age) può essere sortato quà o prima del .map()
        const createElementLi = (parameter) => {
            let stringa = "";
            stringa += '<li class="list-group-item d-flex">';
            stringa += '<div>' + parameter.name;
            //se la lunghezza del parametro city è > 0 allora stampa parameter.city tra parentesi altrimenti ''
            stringa += (parameter.city.length > 0) ? ' (' + parameter.city + ')' : '';
            stringa +=  "</div>";
            stringa += '<div class = "ms-auto">' + parameter.age + ' anni </div>';
            stringa += '</li>';
            //console.log(parameter instanceof Person)
            return stringa;
        }

        /*a printPersonList3 viene passato come argomento l'array persons che viene mappato passando
        la funzone createElemtLi quindi l'argomento parameter punta alle istanze di persons che 
        a loro volta sono costruttori Person. parameter è istanza di Person*/
        ulParent.innerHTML = argument
                                .sort((a,b) => a.age - b.age)
                                .map(createElementLi)   //mappa la funzione
                                .join("")
    }
}
printPersonsList3(persons);


/* Il Codice 1 sembra essere più efficiente rispetto al Codice 2. Ci sono diverse ragioni
per questa affermazione:

Il Codice 1 utilizza il metodo forEach per iterare sugli elementi dell'array e quindi genera un'interfaccia
utente per ciascun elemento, mentre il Codice 2 utilizza il metodo map per creare una stringa HTML
che rappresenta l'intera lista. La creazione di una stringa HTML tramite map e join è meno efficiente
rispetto all'uso di forEach per creare gli elementi HTML.

Nel Codice 1, gli elementi HTML vengono creati dinamicamente e quindi aggiunti all'ul mediante il metodo
appendChild. Nel Codice 2, invece, viene creata una stringa HTML per l'intera lista e quindi viene inserita
nell'ul tramite il metodo innerHTML. In generale, l'uso di innerHTML è meno efficiente rispetto all'uso
di appendChild perché richiede la ricostruzione dell'intera struttura dell'ul.

Nel Codice 1, gli elementi HTML vengono creati utilizzando il metodo createElement e quindi il codice è più
leggibile e manutenibile rispetto al Codice 2, che utilizza una stringa HTML per creare gli elementi.

Tuttavia il codice 3 è più efficiente

In termini di velocità, il Codice 1 dovrebbe essere più veloce rispetto al Codice 2, in particolare per liste
di lunghezza significativa. */

//PARTE 2
/* let esForm = document.getElementsByTagName("form").item(0);
esForm.addEventListener("submit", (event) => {selectPerson
    event.preventDefault();     //impedisce il compportamento predefinito del browser (spedire i dati)
    event.stopPropagation();    //impedisce la propagazione degli eventi dai figli al padre
    const form = event.target; //oggetto sul quale è stato triggerato l'evento
    form.reset();                //è un metodo dei form, permette di svuotare resettando
    //oppure
    //esForm.reset();       
}) */


//PARTE 3 creare una lista selezionabile popolata dalle persone create precedentemente*/

function selectPerson(argument){


    const newOptionElement = argument
                            .filter(p => p instanceof Person)   //filtro di controllo
                            .sort((a,b) => a.age - b.age)
                            .map((parameter) => new Option(parameter.name + " " + parameter.age));
                            //new Option crea un nuovo elemento html option


    const form1 = document.forms.item(1);                         //document.forms.item(1).elements[0]
    const firstElement = form1.elements[0];                             
    const firstChild = [firstElement.children[0]];                //HTMLCollection like-Array Object

    const multyArray = firstChild.concat(newOptionElement);       //concatena più array

    form1.elements[0].innerHTML = "";                             //svuota
    multyArray.forEach((item) => {
        firstElement.append(item)
    })
}
selectPerson(persons);

//passaggi del selettore
/* sono stati fatti vari passggi per selezionare l'elemento firstChild
questo perché è necessario mantenerlo come Array.
Selezionando l'elemento direttamente come la const test non si ottiene un array
che dovrebbe essere quindi riconvertito in array poer applicare i metodi successivi*/
//arraY

/* const form1 = document.forms.item(1)
const firstElement = form1.elements[0];
const firstChild = [firstElement.children[0]]
console.log(firstChild, firstChild instanceof Array)
//transformazione in array
const test = document.forms.item(1)[0]
console.log(test)
testArray = Array.from(test);
console.log(testArray, testArray instanceof Array) */


//PARTE 4
const buttonForm1 = document.forms.item(1)

buttonForm1.addEventListener("submit", (evento) =>{
    evento.preventDefault();
    evento.stopPropagation();

    const selectedPersonName = evento.target.elements[0].value;
    //const selectedPersonName = document.forms.item(1).elements[0].value

    const selectedPerson = persons.list.find((item) => item.name === selectedPersonName)
    if(selectedPerson instanceof Person){
        selectedPerson.age++;
        console.log(selectedPerson, selectedPerson instanceof Person)
        document.dispatchEvent(new Event("listUpdate", {
                bubbles: true
        }))
    }

})

/*
Viene restituito Errore formPopulation_spiegazione.js:241 Uncaught TypeError: Cannot read properties of undefined (reading 'find')
    at HTMLFormElement.<anonymous> (formPopulation_spiegazione.js:241:41)
    

    */




//TRIGGER SELETTORE
const personCreareForm0 = document.forms.item(0);
    personCreareForm0.addEventListener("submit", (evento) => {
    evento.preventDefault();    //disattiva il comportamento di default
    evento.stopPropagation();   //disattiva il comportamento di default
    const form = evento.target;
    const nome = form.elements[0].value;
    const età = form.elements[1].value;
    const città = form.elements[2].value;

    const personCostructor = new Person(nome, età, città);

    persons.push(personCostructor);
    printPersonsList3(persons);       //refresh
    selectPerson(persons);
    form.reset();
} )


/* const personCreareForm1 = document.forms.item(1);

personCreareForm1.addEventListener("submit", (evento) => {
    evento.preventDefault();    //disattiva il comportamento di default
    evento.stopPropagation();   //disattiva il comportamento di default
});
 */














//parte 3 commentata
/* const parentSelector = document.querySelector("select.form-select");
console.log(parentSelector)
function selectPerson(argument){
    if(argument instanceof Array){
        const createSelectPerson = ((value) => {
            let string = "";
            string += "<option>";
            string += value.name + " ";
            string += (value.city.length > 0) ? value.name + " (" + value.city + ") " : " ";
            string += value.age + " anni";
            string += "</option>";
            return string;
        })
        parentSelector.innerHTML = argument
                                        .sort((a,b) => a.age - b.age)
                                        .map(createSelectPerson);                                                  
    }
};
selectPerson(persons) */