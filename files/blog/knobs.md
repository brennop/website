---
title: "controles diy"
date: 2023-10-12
---

Há mais de um ano venho experimentando bastante com arte generativa. A maior
parte do que eu faço vai lá pro [nim.gif](https://instagram.com/nim.gif). É bem
legal explorar diferentes algoritmos e como visualizá-los.

O que não é tão legal é ficar mexendo parâmetros, salvar, recompilar. Da um
trabalhão. Então fiz um editor pra mim, com uma sacada: toda variável vira um
controle html. Acho que uma foto deixa mais claro.

![](/images/knobs/estudio.png)

Foi divertido codar isso. E no frigir dos ovos se mostrou bem útil para iterar
nos parâmetros de cada arte. Mas eu precisava ir mais longe. E se ao invés de
controles virtuais, eu tivesse controles físicos?

Gente, é simples. Tinha uns arduinos sobrando então fui botar a mão na massa.
Basicamente, o que preciso é ligar um potenciômetro em uma entrada analógica e
ler o valor. Aqui está o código super complexo rodando no arduino:

```c
void setup() {
  Serial.begin(9600);
}

void loop() {
  int a0 = analogRead(A0);
  Serial.print(a0);
  delay(33);
}
```

Depois eu uso um servidor websocket para mandar isso pro editor. Deve existir
uma maneira melhor, mas essa foi a mais rápida que pensei. Os controles ficaram
assim.

![Se é gambiarra e funciona, então não é gambiarra](/images/knobs/controles.jpeg)

E aqui o resultado com tudo funcionando.

<video controls>
  <source src="/images/knobs/knobs.webm" type="video/webm" />
  <source src="/images/knobs/knobs.mp4" type="video/mp4" />
</video>

