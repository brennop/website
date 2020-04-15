---
slug: imagens
date: 2020-04-15
title: Fazendo divulgações com o Google Chrome
---

Se não ficou claro pelo meu post sobre [slides](slides), eu
adoro fazer coisas de um jeito criativo e diferente do
padrão. Eu chamo essas filosofia de fazer tudo errado. Tem
funcionando bem pra mim.

No post mencionado eu falo sobre como eu uso markdown e css
pra fazer algo que eles não foram feitos pra fazer: slides.
Nesse post eu vou mostrar como eu uso as ferramentas de
desenvolvimento do Chrome para fazer posts de divulgação.

## o problema

Na nossa empresa júnior muita gente entra pro núcleo de
markting sem muito conhecimento em photoshop e amigos, já
que não ensinamos essas ferramentas. Mas nós ensinamos CSS.

CSS e HTML são muito flexíveis, e Web Designers fazem uns
trem muito fofo só com isso. E se usássemos o poder do CSS
pra fazer o que fazemos com o Photoshop?

Minha ideia inicial era criar uma aplicação, que criasse uma
árvore de divs, e um editor pra estilizar cada uma delas. Ia
envolver um parsing da folha de estilos pra gerar editores
de propriedade intuitivos e várias coisas legais.

Enquanto tentava implementar tudo isso, eu descobri duas
coisas: 1. eu sou muito incompetente pra fazer isso e 2.
várias das features que eu queria implementar (criar uma
ávore de divs, autocomplete de CSS), já estão presentes nas
ferramentas de desenvolvedor dos navegadores!

## fazendo arte

É bem simples fazer artes no navegador. Comece com um
arquivo em branco e abra a janela de Developer Tools
(geralmente F12).

Agora vá criando novas 'layers' no `<body>`. O Firefox tem
um botão conveninte para adicionar um novo nó. No Chrome tem
que ir na mão e ir editando o HTML.

Na parte de baixo do DevTools tem uma região para editar
o estilo do elemento. Vai jogando as propriedades ali e vai
vendo como fica.

Quando tudo estiver pronto, basta selecionar a raiz da sua
árvore e tirar um screenshot do nó. No Firefox a opção está
no menu de contexto. No Chrome basta dar Ctrl+Shift+P
e pesquisar a ação. Agora você deve ter a sua arte
finalizada na sua pasta de Downloads.

## isso não é a mesma coisa brenno

Isso ta longe de substituir a minha ideia original, quem
dirá ferramentas estabelecidas como o photoshop. Mas
é melhor que o Gimp na minha opinião.

CSS é todo sobre layout bem visualizáveis, então achar
o posicionamento ideal dos elementos vai demandar tempo. Mas
pelo menos quando você muda o conteúdo, todo o layout se
reajusta.

## ainda não estou convencido

Neste momento você deve ser
a [Jasmine](https://youtu.be/UTbjH19gqBE?t=128) perguntando
"Mas por quê?" e eu sou apenas a Mhissy respondendo "Porque
Não". Ás vezes a gente precisa ser um pouco Jurassic Park
e não se perguntar se
[devemos](https://www.youtube.com/watch?v=kY-pUxKQMUE).
