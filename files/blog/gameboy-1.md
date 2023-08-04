---
title: meu primeiro emulador
date: 2023-08-03
---

Posso ser bem novinho, mas adoro jogos antigos. Comecei a jogar no snes do irmãos. O irmão me mostrou pokemon uma vez. Jogava num emulador de vez em quando na escola.

O que é um emulador? 

>
> Apesar de encontrar _gameboy_ escrito junto em muitos lugares, o nome certo é Game Boy.
>

# tetris, uma instrução de cada vez

Inspirado por outras implementações, não fiz todas as instruções. Implementava uma, e rodava _tetris.gb_, e esperava o erro.

```
Unknown opcode: 0x21, LD HL, d16 at 0x020D
```

Hora de implementar o opcode 0x21. Depois de cada instrução eu rodava os testes [^1]. E foi assim até o console entrar em um loop infinito. Hora de mostrar algo na tela.

A PPU (pixel processing unit) do game boy faz bastante coisa, provavelmente, para transferir a complexidade dos desenvolvedores para o sistema. Pra começar, existem três camadas: o plano de fundo, a janela e os objetos. Depois tem quatro modos diferentes, cada um com sua peculiaridade. Pra piorar, os _sprites_ são guardados de um jeito maluco na memória.

O primeiro passo foi implementar o plano de fundo. Na posição de memória `0x8000` os jogos guardam os tiles, ...
Depois de muita dor e sofrimento, eu cheguei a tela de copyright do Tetris. yay.

Agora, chega um dos bugs mais bobos dessa jornada. Não importa o que eu fizesse, eu não conseguia sair dessa tela. Comparava minhas instruções com outros emuladores, debugava os traces da cpu, e nada de eu sair da maldita tela de copyright. Será que a nintendo sabia que eu baixei ilegalmente essa rom?

Depois de algumas pesquisas, encontrei o responsável. Os desenvolvedores de Tetris adicionaram um recurso interessante. Se segurar algumas teclas ao mesmo tempo, você reseta o jogo, voltando a tela inicial. Eu ainda não tinha implementado o joypad, mas no game boy ele funciona lendo da posição de memória `0xFF00`. Cada combinação de bits representa algumas teclas, sendo 0 apertado e 1 solto! Como eu não tinha chegado nessa parte ainda, `0xFF00` lia sempre 0, ou seja, tudo apertado! Retornar 0xFF foi uma solução rápida para isso enquanto não tinha input pronto.

![Primeira vez que tetris rodou]()

>
> trivia sobre tetris
>

---

[^1]: https://github.com/adtennant/sm83-test-data
