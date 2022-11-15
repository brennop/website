---
title: AI vai dominar o mundo
date: 2022-11-15
---

2022 tem sido um ano intenso com muitas coisas importantes (guerra, eleições,
etc.). Mas algo que ocorreu e não será lembrado é que esse ano é o ponto de
virada para arte generativa.

Desde de abril quando Dall-E 2 foi anunciado eu tenho acompanhado esse espaço.
Eu lembro até hoje quando isso ocorreu. Eu estava numa aula de IIA (que
coincidência) quando li o anúncio. Meu queixo caiu. Aquilo foi uma das coisas
mais fantásticas que eu já tinha visto.

Mal sabia eu o que ocorreria nos próximos meses. Não só os modelos evoluíram
numa taxa assustadora, também ficaram bem mais acessíveis. 

## Domesticando a IA

Agora chegou a hora legal. A IA foi treinada em muitas fotos do mundo real, mas
nenhuma nossa :cry:. Sem problemas, os pesquisadores do Google [resolveram isso
pra gente](https://dreambooth.github.io/). Vamos nos introduzir a IA.

### 1. Monte seu dataset

Primeiro de tudo, tenha uma conta do Google com bastante espaço sobrando no
drive. Bastante significa alguns gigabytes. Cada modelo pesa 2GB + alguns
arquivos necessários para rodar a inferência.

Agora, abra sua galeria e selecione umas boas fotos suas. Eu sei que vai ser
difícil já que você não sabe tirar foto. Mas se vira aí e selecione umas 20-30
fotos. Agora vão algumas dicas pra melhorar o seu dataset:

- Quanto mais variado melhor. Pegue fotos com locais variados, dia e noite,
  roupas diferentes, e mais importante, ângulos e emoções diferentes.
- Pegue fotos de boa qualidade. Se não tiver muitas, use algum _upscaler_ [^up].
- Evite fotos que obstruam o seu rosto.

No fim, renomeie todos os arquivos para um _token_ de instância. Esse token é
uma palavra que usaremos para pedir pra AI te desenhar. Sugiro usar um
apelido/username. Eu usei `brennop` por exemplo.

### 2. Treine a máquina

> Esses passos foram feitos no dia que escrevi esse post, então podem estar
> desatualizados.

Agora vamos treinar. Esse é o [link do colab](https://colab.research.google.com/github/TheLastBen/fast-stable-diffusion/blob/main/fast-DreamBooth.ipynb).
Se nunca usou um colab, basta rodar os passos em sequência com o botão de play.

### 3. Se desenhe

Essa é a parte mais difícil (e mais divertida). Dominar o modelo de text (CLIP)
é um desafio por si só. Mas vou dar algumas dicas aqui para garantir que ele
gere um pouco do que você quer.

## Previsões

O futuro adeus pertence. Mas mesmo assim vou me arriscar e datar esse post. Aqui
vão alguns dos meus sentimentos para o futuro.

TODO

### 1. A internet será consumida pela IA

### 2. Nossa percepção da realidade vai mudar

### 3. Nossa percepção de nós mesmos vai mudar

