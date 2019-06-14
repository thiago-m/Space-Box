var dados;
var httpRequest;
var peopleContainer = document.getElementById('people');

// Chamando a function para pegar os dados do json
peopleRequest();

// Function para recuperar as pessoas e dados do json via ajax
function peopleRequest(){
    //criando o objeto xmlhttprequest
    if(window.XMLHttpRequest){
        httpRequest = new XMLHttpRequest();
    }
    else if(window.ActiveXObject){
        try{
            httpRequest = new ActiveXObject("Msxml2.XMLTTP");
        } catch(e){
            try{
                httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
            } catch(e){
                alert('Navegador/versão incompativel com o xmlhttprequest');
            }
        }
    }
    if(!httpRequest){
        alert('Erro ao tentar criar um instancia do objeto XMLHTTPREQUEST');
        return false;
    }

    httpRequest.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            dados = JSON.parse(this.responseText);
            people(dados);
        }
        
    }

    // fazendo o request
    httpRequest.open('GET', './js/dados.json');
    httpRequest.send();
}

// Funcion para por na pagina html a mesma quantidade e com os mesmos dados as pessoas do json
function people(people){
    var person = '<div class="col-12">'+
                    '<div class="box-active">'+
                        '<div class="photo">'+
                            '<img src="./img/'+people[0].foto+'" alt="">'+
                        '</div>'+
                        '<div class="dados">'+
                            '<div class="dado">'+
                                '<p>'+
                                    'NOME:'+
                                '</p>'+
                                '<p>'+
                                    people[0].nome+
                                '</p>'+
                            '</div>'+
                            '<div class="dado">'+
                                '<p>'+
                                    'CARGO:'+
                                '</p>'+
                               '<p>'+
                                   people[0].cargo+
                                '</p>'+
                            '</div>'+
                            '<div class="dado">'+
                                '<p>'+
                                    'IDADE:'+
                                '</p>'+
                                '<p>'+
                                    people[0].idade+
                                '</p>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>';
    for(var i=0; i<people.length; i++){
        var active;
        if(i==0){
            active = 'active';
        }
        else{
            active = '';
        }
        person += '<div class="col-4">'+
                        '<div class="box '+ active +'" onclick="active(this, '+people[i].id+')">'+
                            '<div class="number-photo">'+
                                '<div class="photo">'+
                                    '<img src="./img/'+people[i].foto+'" alt="">'+
                                    '<span>'+
                                        people[i].id+
                                    '</span>'+
                                '</div>'+
                            '</div>'+
                            '<div class="nome-cargo">'+
                                '<p>'+
                                    people[i].nome+
                                '</p>'+
                                '<p>'+
                                    people[i].cargo+
                                '</p>'+
                            '</div>'+
                        '</div>'+
                    '</div>';
    }
    peopleContainer.innerHTML = person;
}

// Function para por o box em destaque
function active(e, id){
    // retirando active do ultimo elemento ativo
    document.querySelector('.active').classList.remove('active');

    // colocando o novo elemento como ativo
    e.className = 'box active';

    // Recuperando dados para por no box em destaque
    var personDestaque;
    for(var i=0; i < dados.length; i++){
        if(dados[i].id == id){
            personDestaque = dados[i];
        }
    }
    
    // recuperando elementos do box em destaque e alterando
    var boxDestaque = document.querySelector('.box-active');
    // Imagem
    boxDestaque.children[0].children[0].src = './img/'+personDestaque.foto;
    // Nome
    boxDestaque.children[1].children[0].children[1].innerHTML = personDestaque.nome;
    // Cargo
    boxDestaque.children[1].children[1].children[1].innerHTML = personDestaque.cargo;
    // Idade
    boxDestaque.children[1].children[2].children[1].innerHTML = personDestaque.idade;
}

// Function para o menu mobile
function Menu(){
    document.getElementById('MenuToggle').classList.toggle('openMenu');
    document.querySelector('.options').classList.toggle('active');
    
}