---
title: Meu próprio Minecraft
date: 2023-07-27
---

É estranho pensar que fazem mais de 10 anos que eu criei meu primeiro mundo no
Minecraft. Depois desse tempo todo ainda não consigo descrever como era.
Parecia algo grande de mais, e mesmo assim era uma experiência acolhedora. 

Esse jogo foi, definitivamente, uma parte importante da minha vida. Não só
pelos amigos que fiz ou pelas horas que passei, mas porque foi a primeira vez
que programei. [^1] E agora, quase completando minha graduação em Computação,
eu decidi completar o ciclo.

Escrevi meu próprio Minecraft.

# Matrizes

Eu amo Lua e amo LÖVE [^2]. É um framework extremamente versátil para joguinhos
2D. "Mas o minezinho é três-dê" você diz. Bom, 3D é apenas uma dimensão a mais
projetada na sua tela. Pra fazer isso, basta multiplicar umas matrizes e tá
pronto.

```glsl
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

vec4 position( mat4 transform_projection, vec4 vertexPosition )
{
    return projectionMatrix * viewMatrix * modelMatrix * vertexPosition;
}
```

# Cubos

![A demo mais antiga da minha engine](/images/minecraft/cube.png)

Desenhar um cubo é fácil. O problema é desenhar milhares deles. Pra fazer isso,
Minecraft divide o mundo em *chunks*, ou pedacinhos de 16x256x16. Isso não só
alivia para a GPU desenhar o mundo, mas também facilita fazer as atualizações de
cada frame.

Nossa versão não é diferente. Dividimos o mundo em pedaços de 16x48x16. Esses
*chunks* são gerados aleatoriamente. Pra fazer isso usamos ruído *Perlin*, que
LOVE convenientemente fornece pra gente.

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
feito 16 * 16 * 48 * 6 vezes por *chunk*. Isso é terrívelmente lento 😭. 
Então eu decidi apelar para _threads_. Dessa forma, a renderização não fica esperando
o mundo ser gerado.

Durante esse processo, calculamos para cada vértice sua coordenada de textura,
seu vetor normal (para iluminação) e o seu *ambient occlusion* [^3].
O resultado é um belo pedacinho de mundo.

![uma chunk](/images/minecraft/chunk.png)

# Matar o dragão

Depois de gerar um mundo todo, parei por aí. Não queria um jogo pra matar meu
tempo, só uma demonstração da parte visual. Adicionei apenas colisão (AABB) e
_raycasting_ para destruir e construir blocos. Confesso que não entendo muito
bem a implementação de ambos.

Adicionei algumas coisinhas que o Minecraft não tem, como sombras de verdade e
_dithering_ no lugar da transparência. O resultado é esse mundinho aí.

![mundo](/images/minecraft/world.png)

# Lições Aprendidas

3D não é tão difícil assim. Recomendo dar uma pesquisada e tentar fazer a sua
própria engine. Minecraft é um ótimo projeto pra testar isso. Fui um pouco
mordido pela otimização prematura e agora o código é bem feio. Mas se quiser
dar uma olhada pra ter uma referência, ou até testar ta aqui:

- [lunarcraft](https://github.com/brennop/lunarcraft)

Se der `segfault` relaxa, faz parte da experiência 😎.

---

[^1]: [[1.2.5]Simple Guns Mod (Beta 1.2)](https://www.minecraftforum.net/forums/mapping-and-modding-java-edition/minecraft-mods/1284429-1-2-5-simple-guns-mod-beta-1-2)
/ [https://archive.is/05f90](https://archive.is/05f90)

[^2]: [love2d](https://love2d.org)

[^3]: [Ambient occlusion for Minecraft-like worlds](https://0fps.net/2013/07/03/ambient-occlusion-for-minecraft-like-worlds/)
