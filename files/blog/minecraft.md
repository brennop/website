---
title: Meu próprio Minecraft
date: 2023-04-10
---

É estranho pensar que fazem mais de 10 anos que eu criei meu primeiro mundo no
Minecraft. Depois desse tempo todo ainda não consigo descrever como era. Parecia
algo grande de mais, e mesmo assim era uma experiência acolhedora. 

Esse jogo foi definitivamente uma parte importante da minha vida. Não só pelos
amigos que fiz ou pelas horas que passei, mas porque foi a primeira vez que
programei. [1] E agora, quase completando minha graduação em Computação, eu
decidi completar o ciclo.

Minecraft não é um jogo complexo. É simples na verdade. O que faz parecer
complexo na verdade é a emergência [2], mas não vou entrar nesse mérito. Essa
simplicidade foi talvez razão do seu sucesso, mas também permitiu muitos clones.
A ideia de um mundo de voxels, gerado proceduralmente, com texturas retrô não é
tão difícil de copiar. E foi isso que decidi fazer: uma cópia pra chamar de
minha.

Muitos dos clones existentes usam uma engine como Unity para ~~trapacear~~
facilitar o trabalho. Eu queria ter a experiência completa, ou seja, no engine.
A linguagem que eu decidi usar foi Lua, minha linguagem preferida. Só que até
agora só sabia fazer jogos 2D com LÖVE [3]. Como eu faço 3D então?

# Matrizes

LÖVE é incrivelmente versátil. Tem suporte a várias funcionalidades, incluindo
texturas, vértices, shaders. Acontece que é tudo que precisa para fazer 3D,
desde que saiba multiplicar matrizes. 3D não é nada mais do que um vértices de 3
dimensões (x, y, z). 

Podemos pegar esses vértices e multiplicá-los por uma
matriz de transformação, pra mover, dimensionar e rotacionar. Chamamos essa
matriz de Model. Esses vértices são vistos por uma câmera. Ao contrário da nossa
intuição, quando andamos para frente em um jogo 3D, não é a câmera que se move
para frente, e sim o mundo que vai para trás. Para fazer isso, podemos construir
uma matriz com a posição da câmera, e vetores dizendo para onde é a frente e
para onde é cima. Para mover o mundo basta multiplicar. Chamamos essa matriz de
View. Até agora tudo bem, mas nossa tela é 2D, então precisamos projetar esses
vértices transformados de 3 dimensões para 2. Fazemos isso com, adivinha, uma
matriz. Essa matriz codifica o campo de visão e outras informações e chamamos
ela de Projection.

No fim, temos essa equação:

v′=P⋅V⋅M⋅v

E isso é tudo que precisamos para ver 3D num framework 2D.

```glsl
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

vec4 position( mat4 transform_projection, vec4 vertexPosition ) { 
    return projectionMatrix * viewMatrix * modelMatrix * vertexPosition; 
}
```

# Cubos e cubos

![A demo mais antiga da minha engine]()

Desenhar um cubo é fácil. O problema é desenhar milhares deles. Pra fazer isso,
Minecraft divide o mundo em *chunks*, ou pedacinhos de 16x256x16. Isso não só
alivia para a GPU desenhar o mundo, mas também facilita fazer as atualizações de
cada frame.

Nossa versão não é diferente. Dividimos o mundo em pedaços de 16x48x16. Esses
*chunks* são primeiramente gerados aleatoriamente. Pra fazer isso usamos ruído
*Perlin*, que LOVE convenientemente fornece pra gente.

```lua
height = height + love.math.noise(x * frequency, z * frequency) * amplitude 
max = max + amplitude 
amplitude = amplitude / 2 frequency = frequency * 2
```

Depois que uma *chunk* é gerada, precisamos gerar uma *mesh* para ela. Uma
*mesh* é simplesmente uma coleção de vértices que é enviado para a GPU para ser
desenhado.

Existem vários algoritmos para *meshing* eficiente. Aqui só iteramos pelos
blocos checando se cada face é visível (não está obstruída). Mas isso precisa ser
feito 16 * 16 * 48 * 6 vezes por *chunk*. Isso é terrívelmente lento :crying:. 
Então eu decide apelar para a thread. Dessa forma, a renderização não fica esperando
o mundo ser gerado.

Durante esse processo, calculamos para cada vértice sua coordenada de textura,
seu vetor normal, para cálculos de iluminação, e o seu *ambient occlusion* [4].
O resultado é um belo pedacinho de mundo.

![1680823684.png]()

# 

Para a gameplay, precisamos de mais matemática. 

---

[1]: [https://www.minecraftforum.net/forums/mapping-and-modding-java-edition/minecraft-mods/1284429-1-2-5-simple-guns-mod-beta-1-2](https://www.minecraftforum.net/forums/mapping-and-modding-java-edition/minecraft-mods/1284429-1-2-5-simple-guns-mod-beta-1-2)
/ [https://archive.is/05f90](https://archive.is/05f90)

[2]: [https://pt.wikipedia.org/wiki/Emergência](https://pt.wikipedia.org/wiki/Emerg%C3%AAncia)

[3]: Love2d.org

[4]: [https://0fps.net/2013/07/03/ambient-occlusion-for-minecraft-like-worlds/](https://0fps.net/2013/07/03/ambient-occlusion-for-minecraft-like-worlds/)
