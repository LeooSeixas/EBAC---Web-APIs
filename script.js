const getElement = (id) => document.getElementById(id);
const street = getElement("street");
const neighborhood = getElement("neighborhood");
const city = getElement("city");
const state = getElement("state");
const cep = getElement("cep");
const number = getElement('number');


function saveData (){
    localStorage.setItem('cep', cep.value);
    localStorage.setItem('street', street.value);
    localStorage.setItem('neighborhood', neighborhood.value);
    localStorage.setItem('city', city.value);
    localStorage.setItem('state', state.value);
    localStorage.setItem('number', number.value);
}

cep.addEventListener("blur", (event)=> { //Pegamos o input cep e observamos quando o usuário sair do input
    const element = event.target;
    const cepValue = element.value;

    if(!(cepValue.length === 8)) return; // caracteres menores que 8 darão erro

    fetch(`https://viacep.com.br/ws/${cepValue}/json/`) //API para buscar CEP no ViaCep
        .then(response => response.json())
        .then(data => {
            if(!data.erro){
                street.value = data.logradouro;              
                neighborhood.value = data.bairro;                
                city.value = data.localidade;                
                state.value = data.estado

                saveData();

            } else { alert("CEP não localizado no sistema") }
        })
        .catch(error => console.error('Error ao buscar o CEP', error));
})

number.addEventListener("blur", () => {localStorage.setItem('number', number.value);})

document.addEventListener('DOMContentLoaded', () => {
    cep.value = localStorage.getItem('cep');
    street.value = localStorage.getItem('street');
    neighborhood.value = localStorage.getItem('neighborhood');
    city.value = localStorage.getItem('city');
    state.value = localStorage.getItem('state');
    number.value = localStorage.getItem('number');
})

document.getElementById('clear').addEventListener('click', () =>{
    localStorage.clear();
    cep.value = '';
    street.value = '';
    neighborhood.value = '';                
    city.value = '';                
    state.value = '';
    number.value = '';
})
