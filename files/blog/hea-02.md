---
title: "HEAnV #02"
date: 2023-10-26
---

Uma das partes mais legais de usar o vim ainda é refatorar linhas inteiras com
algumas porradas no teclado. Quando você precisa interpolar uma string em js e
você apenas <code>cs"\`</code>. Eu sei, precisa do `vim-surround`, mas se ainda não tem
esse plugin, o que está fazendo?

Recentemente descobri que esses movimentos do surround também servem pra tags!
Você provavelmente já conhece <kbd>c</kbd><kbd>i</kbd><kbd>t</kbd> para alterar
o conteúdo dentro das tags, ou até <kbd>d</kbd><kbd>a</kbd><kbd>t</kbd> para remover
a tag e seus filhos por inteiro.

Mas sabia que também pode fazer <kbd>d</kbd><kbd>s</kbd><kbd>t</kbd> para
deletar somente as tags, e manter o conteúdo. Menos óbvio ainda é que é
possível trocar uma tag, com: <kbd>c</kbd><kbd>s</kbd><kbd>t</kbd><kbd>t</kbd>.

> Isso funciona porque o comando `cs`, ou _change surrounding_ recebe dois objetos,
> uma fonte e um destino. Nesse caso, a fonte é `t`, uma tag, e o destino é
> `t`, uma tag, mas pode ser qualquer um dos disponíveis: `:help surround-targets`.

## Bônus

Omni-completion funciona pra fechar uma tag correspondente, mesmo sem
configurar nadinha. Se abriu uma tag, pra fechar basta escrever `</` e
<kbd>Ctrl-x</kbd><kbd>Ctrl-o</kbd>.
