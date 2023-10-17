---
title: "profiling LÖVE"
date: 2023-10-17
---

Estava dando um gás no meu [clone de minecraft](/blog/minecraft.md) e o tempo
de carregamento dos chunks estava dando uma incomodada. Como mencionei anteriormente,
minha solução foi apenas apelar para o multithreading, sem entender exatamente
o problema. Dessa vez eu decidi que ia dar uma atenção a mais.

Lua + LÖVE é meu combo preferido para projetos visuais. Isso só da certo porque
luajit é bem rápido. Mas as vezes a gente escreve uns códigos feios, que não
utilizam bem do potencial do jit. Então ao invés de ficar adivinhando, seria bom
saber onde que estão esses pontos pra gente consertar.

# jit.p

Pra descobrir isso existem pedaços de software conhecido como profilers, que
analisam o comportamento de um programa em tempo de execução, e reportam
estatísticas úteis, como tempo de execução de cada função. Existem alguns
_profilers_ para Lua, mas sabia que luajit já vem com um? [^1].
Pra começar a usar dentro do LÖVE basta incluir a lib:

```lua
local profiler = require "jit.p"
```

Depois eu gosto de conectar os ganchos do profiler aos `callbacks` do LÖVE dessa forma:

```lua
function love.keypressed(key)
  if key == "escape" then 
    love.event.quit() 
    profile.stop()
  end
end

function love.load()
  profile.start "l"
end
```

Daí é só rodar e ver as estatísticas no seu terminal.

# Opções

TODO

# Descobertas

---

[^1]: http://luajit.org/ext_profiler.html
