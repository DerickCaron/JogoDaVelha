
var uI;
var board;
var players;
var gameRoles;
var isGameOver; 
        
startGame      = function(){ /*Aqui eu estou chamando duas funçoes, ou seja, estou conectando com outras, por aqui que começa o jogo, lembre-se que é necessário colocar onload="startGame()" conectada no html dentro da body, senão não irá funcionar*/
    setup(); 
    eventHandle(); 
} 






hasWinner  = function(){ /* Detalhe que este "i" é uma variável que poderia ter qualquer outro nome, não precisa ser necessariamente um i. E outra coisa sempre que tiver esse ++ significa acrescentar mais 1.*/
    for(let i = 0 ; i < gameRoles.length; i++){ /*Lendo o que está escrito fica (Lembrando que LENGTH significa TAMANHO): Se o TAMANHO(LENGTH) da "gameRoles" for maior < que "i"(neste caso i é igual a zero) então acrescente mais 1, ou seja, i++. Que no caso é acrescente a possibilidade de adicionar mais uma função, por isso que depois você pode ver que tem uma outra função dentro dessa que especifica quem vai poder clicar caso i seja igual a 0, ou seja, caso esteja vazio. */
        for(let player of players){
            if(board[gameRoles[i][0]]  == player.id &&     /*Aqui os números 1, 2 e 3 se referem às linhas do jogo da velha*/
                board[gameRoles[i][1]] == player.id &&     /*O que está sendo dito aqui é que se uma das linhas estiver com a variável "i" que é zero, ou seja, se uma das linhas estiver vazia, então recebe o comando da "player id" que no caso é o comando de clicar*/
                    board[gameRoles[i][2]] == player.id){   /*Lembrando que VAR gameRoles está ali para verificar se as regras de vitória já foram cumpridas, se já tiver um ganhador então não haverá possibilidade de CLICK*/
                /*Caso as regras da gameRoles sejam cumpridas então esta função abaixo que passa a valer*/
                player.isWinner  = true; /*1. se a vitória do jogador for TRUE, então*/
                player.score    += 1;    /*2. ele recebe +1 ponto*/
                isGameOver       = true; 
                player.isMyTurn  = true;
                uI.score[player.id-1].innerText = player.score;

                if(player.id == 1)
                    players[1].isMyTurn = false;

                if(player.id == 2)
                    players[0].isMyTurn = false;

                return true;
            }

        }
    }
    return false;
}





restatGame = function(){ /*Aqui o jogo está começando do começo de novo*/
    players[0].isWinner=false;
    players[1].isWinner=false;
    board =[0,0,0, 0,0,0, 0,0,0]; /*Aqui a board zera tudo de novo, ou seja, fica vazia*/
    for(let piece of uI.pieces)
        piece.innerText = "";
    isGameOver = false;
}




update      = function(){
    if(hasWinner()){
        console.log(isGameOver);
    }
    setMsg();
}







setMsg = function(){

    for(let player of players){

        if(player.isMyTurn && player.isWinner){

            uI.msg.innerText = player.piece +" Win";
            return 0;

        }

        if(player.isMyTurn && !player.isWinner){

            uI.msg.innerText = player.piece +" Turn";	
            return 0;

        }

    }

}








setup = function(){

    isGameOver = false;
    players    = [];
    players[0] = {id:1, name:"X", piece:"X", score:0, isMyTurn:true, isWinner:false};
    players[1] = {id:2, name:"P O", piece:"O", score:0, isMyTurn:false, isWinner:false};
    board      = [0,0,0, 0,0,0, 0,0,0];
    gameRoles  = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[2,4,6],[0,4,8]];
    uI         = {};
    
    setUi();

}







play        = function(){}






eventHandle = function(){
        let index = 0; /*Se a minha variavel interna for 0, ou seja, estiver vazia. Então aplique a função abaixo*/
    for(let piece of uI.pieces){/*1.VAR é a variável geral, LET é a variável interna de uma função, ou seja, esta dizendo que se LET PIECE: se a variável interna Piece que pertence a uI.pieces, ou seja, ele conectou a variavel interna "piece" com todas as divs com "classe piece".*/
                  
        /*2.Então faça com que*/
            piece.index = index++; /*Repare que quando escrevi "let piece", a palavra piece se tornou uma variável interna, e quando escrevi "piece.index" quer dizer que eu estou criando um endereço onde eu poderei acessar todos os comandos dentro dessa LET quando eu quiser usá-la*/
            piece.addEventListener("click",()=>pieceEventClick(piece)); /*Aqui esta dizendo para que a PIECE que for selecionada, então adicione "click", se a PIECE for clicada então VÁ=> para a função "pieceEventClick"*/
    }
    uI.btn_restart.addEventListener("click", ()=>restatGame()); /*Repare que aqui este comando não tem nenhuma função definindo sua funcionalidade, porque este é um botão que quem deve clicar é o jogador caso queira reiniciar a partida*/
    /*Lendo o comando acima: Quando coloquei "uI.btn_restart" estou dizendo para o sistema buscar o grupo "btn_restart" que pertence a variavel maior "VAR uI" e adicionar um evento "addEventListener". No caso este evento é um "click". Caso seja "clicado" ele deve ir para a função "=>restatGame()"*/
}








pieceEventClick = function(piece){ /*Detalhe muito importante, ali na ( function(piece) ) o motivo de colocar a palavra PIECE dentro da () é porque PIECE é uma variável interna(LET), essa variavel interna PIECE foi criada lá no "eventHandle" lá naquela parte que diz: for(let piece of uI.pieces) e depois com o endereço piece.index*/
if(!isGameOver) /*Se a derrota for FALSE então vá para a função abaixo, mas se for TRUE vá para "return 0"*/
    for(let player of players){ /*Se a variável interna(LET player) que pertence a a VAR "players" execute a função. Neste caso eu defini agora que player é uma variavel interna(LET) de "VAR players" , antes não existia esta variavel interna*/
        if(player.isMyTurn && board[piece.index] == 0){ /*Aqui esta dizendo que: Se "if" a variável interna(LET) "player" estiver na vez de jogar "isMyTurn". Então toda a região "board" recebe os comandos da variável interna(LET) "piece"*, ou seja, nos comandos da "piece" tihamos efetuado a capacidade de CLICK, sendo assim na vez do "player" ele recebe todos os comandos da "piece" e toda a "board" se torna CLICÁVEL desde que seja "== 0" ou seja, desde que esteja vazia*/

            board[piece.index] = player.id; /*Aqui está dizendo que "board[piece.index]" é igual a palavra "player.id", ou seja, quando player.id aparecer todos os comandos da "board[piece.index]" serão válidos*/
            player.isMyTurn    = false;
            
            if(player.id == 1) /*1.Aqui está dizendo que se "player.id for igual a 1" então o jogador com a "id:1" recebe os comandos da "board[piece.index]"*/
                players[1].isMyTurn = true; /*Detalhe, aquele [1] se refere que esse jogador é o segundo a jogar depois do primeiro, no caso nós definimos que o primeiro a jogar é com a "id:1", lembrando que a contagem na programação sempre começa com o zero*/
                /*Acima está dizendo que se o jogador com a "id:1" estiver na vez, ou seja, estiver com os comandos da "board[piece.index]" então o próximo jogador a receber estes comando é o segundo jogador*/
            if(player.id == 2)
                players[0].isMyTurn = true;
            /*E neste comando acima é a mesma coisa, só que o próximo a jogar é o que começou a jogar primeiro*/
            
            uI.pieces[piece.index].innerText = player.piece; /*Aqui está dizendo que todas as DIVS incluídas na "uI.pieces" e que estiverem com o comando [piece.index], ou seja, estiverem com o comando de clicar, devem receber um TEXTO(innerText) ao serem clicadas. E todo este comando de "uI.pieces[piece.index].innerText" é igual a "player.piece", ou seja, player.piece se tonou o mesmo comando que "uI.pieces[piece.index].innerText".*/
           update()
            return 0;
        }	
    }

return 0;
}










setUi = function(){ /*Aqui eu peguei a "VAR uI" e criei grupos diferentes que pertencem a uI, criei estes grupos dentro de uma FUNÇÃO, depois de criar o grupo eu selecionei o que faz parte de cada grupo usando o comando "document.getElementsByClassName", com ese comando eu quis dizer para o sistema selecionar todas as TAGS com a classe que eu escolhi*/
        uI.score    = document.getElementsByClassName("score");
    	uI.pieces      = document.getElementsByClassName("piece");
    	uI.btn_restart = document.getElementsByClassName("btn-restat-game")[0];
    	uI.msg 	       = document.querySelector(".msg"); 
    }	
