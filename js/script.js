
var httpRequest;

peopleRequest();

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
            people(JSON.parse(this.responseText));
        }
        
    }

    // fazendo o request
    httpRequest.open('GET', './js/dados.json');
    httpRequest.send();
}

function people(people){
    console.log(people);
    var peopleContainer = document.getElementById('people');
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
                        '<div class="box '+ active +'">'+
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

function add_class(){
    document.getElementById('MenuToggle').classList.toggle('openMenu');
    document.querySelector('.options').classList.toggle('active');
    
}