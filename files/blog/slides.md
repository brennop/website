---
slug: slides
date: 2020-03-13
title: md + css = Slides perfeitos
---

Eu amo markdown. É na minha opinião uma das melhores coisas
que inventamos no século 21. É intuitivo, rápido, e mais
importante, útil. Com tão pouco se faz tanto.

Eu odeio slides. Sei que sem eles alguns professores
estariam sem emprego. Mas slides são horríveis pra acessar.
É difícil de pesquisar, são feios e desajeitados, geralmente
são distribuídos num formato _ruim_ tipo `pdf` ou `pptx`.
Eles são o anti-markdown no meu coração.

Fazer slides é bem chato pra mim. Lidar com as ferramentas
disponíveis não me trazia felicidade.

O que eu queria era uma sistema que

- fosse flexível - markdown é só uma especificação, eu posso
  usar em qualquer lugar
- fosse fácil - usando linguagens que eu já sei
- exportasse para html - chega de pdf e pptx
- sem js - só pelo desafio

Comecei então a buscar ferramentas. Há vários processadores
de slide que usam markdown. Mas nenhum cumpria os
requisitos. Cheguei a conclusão que devia fazer do meu
próprio jeito.

# sem js

---

Hoje eu trabalho na empresa júnior de computação da UnB,
onde uso primariamente Javascript. Enquanto js facilita
muito a nossa vida de dev, não acho que preciso de
javascript pra uma apresentação simples. Como o resultado
deve ser html, é só usar o scroll da página pra passar os
slides.

Humm. Isso não parece que vai dar certo. Slides geralmente
são horizontais e o scroll é impreciso. É agora que o css
entra em jogo.

# scroll-snap-type

---

Além de fazer os slides ficarem bonitinhos, o css vai fazer
nossa página html funcionar como um slide, sem precisar de
js. A mágica vem do módulo [scroll
snap](https://www.w3.org/TR/css-scroll-snap-1/), que faz
a rolagem dar uma _'pregada'_.

```css
body {
  scroll-snap-type: x mandatory;
  overflow-x: scroll;
}

section {
  scroll-snap-align: start;
}
```

Usando css também é possível fazer a rolagem ser horizontal
e magicamente nossa página fica parecendo um slide decente.
De quebra a gente ainda ganha passagem com as setinhas e uma
animaçãozinha nativa.

O Scroll Snap é suportado por [todos os browser
atuais](https://caniuse.com/#search=scroll%20snap),
incluindo mobile. Mas isso nem importa porque provavelmente
vou apresentar os slides do meu computador.

# nem tudo são flores

---

Ok, eu levei uma tarde pra chegar nisso. E seguindo
a filosofia de não codar nada e só hackear o que existe,
é óbvio que isso vem cheio de limitações.

Pra começar, não consegui pensar num jeito jsless pra fazer
as coisas irem aparecendo no mesmo slide. Tudo aparece de
uma vez. Spoilers pra todo mundo.

E como eu defino as seções dos meus slides? Minha ideia foi
seguir outras ferramentas e definir usando títulos de
primeiro nível. Pra isso meu compilador de markdown deve
envolver títulos em tags \<section\>.

# como ficou

---

Usando o pandoc (pode usar qualquer conversor) o comando que
usei foi

```sh
pandoc -s slides.md --css slides.css -o index.html --section-divs
```

Você pode confirir uma demo [aqui](https://slides.brn.wtf).

O template `slides.css` pode ser encontrado
[aqui](https://gist.github.com/brennop/f75b7ba1ce575f3b8a764f04e36faadf).

# leitura adicional

---

[Web-based slideshow](https://en.wikipedia.org/wiki/Web-based_slideshow)

[MDX Deck](https://github.com/jxnblk/mdx-deck)
