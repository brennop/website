---
title: "HEAnV #02"
date: 2023-10-26
---

Uma das partes mais legais de usar o vim ainda é refatorar linhas inteiras com
algumas porradas no teclado. Sabe quando você precisa interpolar uma string em
js e você apenas <code>cs"\`</code>. Eu sei, precisa do `vim-surround`, mas se
ainda não tem esse plugin, o que está fazendo?

Recentemente descobri que esses movimentos do _surround_ também servem pra tags!
Você provavelmente já conhece <kbd>c</kbd><kbd>i</kbd><kbd>t</kbd> para alterar
o conteúdo dentro de tags, ou até <kbd>d</kbd><kbd>a</kbd><kbd>t</kbd> para remover
a tag e seus filhos por inteiro.

Mas sabia que também pode fazer <kbd>d</kbd><kbd>s</kbd><kbd>t</kbd> para
deletar somente as tags, e manter o conteúdo? Menos óbvio ainda é que é
possível trocar uma tag, com: <kbd>c</kbd><kbd>s</kbd><kbd>t</kbd><kbd>t</kbd>.

> Isso funciona porque o comando `cs`, ou _change surrounding_ recebe dois objetos,
> um destino e uma substituição. Nesse caso, o destino é `t`, uma tag, e a
> substituição é `t`, uma tag. Pra saber mais, `:help surround-targets` e
> `:help surround-replacements`

Lendo esse _help_ acabei descobrindo uma funcionalidade que não conhecia, um
HEA dentro do HEA. É possível adicionar chamada de funções com o _target_ `f`.
🤯

```
  Old text          Command           New text  
  "hello"           ysWfprint<cr>     print("hello")
```

Se você usa linguagens com _symbols_, como `ruby` ou `fennel`, uma substituição
possível é `:`. Por exemplo, se quiser trocar uma _string_ para um _symbol_,
basta <kbd>c</kbd><kbd>s</kbd><kbd>"</kbd><kbd>:</kbd>. Agora, se quiser fazer
o contrário, [não é tão
obvio](https://github.com/tpope/vim-surround/issues/145).

## Bônus

Omni-completion funciona pra fechar uma tag correspondente, mesmo sem
configurar nadinha. Se abriu uma tag, pra fechar basta escrever `</` e
<kbd>Ctrl-x</kbd><kbd>Ctrl-o</kbd>.

> Se uma LSP estiver rodando é capaz que ela tenha sequestrado seu `omnifunc`.
> Nesse caso senta e chora porque eu não sei o que fazer 🤷
