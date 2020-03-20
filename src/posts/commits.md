---
slug: commits
date: 2020-03-20
title: Boas práticas de mensagens de commit
---

Esse post é um acompanhamento da minha apresentação no Focatalks #2. Siga para a leitura adicional para entender o porquê de se seguir essas boas práticas.

# O verdadeiro commando ✅

---

Para escrever boas mensagens use `git commit`, sem o `-m`, para abrir o editor padrão. Desse jeito, você se força a parar um pouco e pensar na sua mensagem de commit. Além disso, os editores modernos te ajudam a manter as boas práticas, te indicando quando há muitos caracteres e pulando linhas automaticamente.

Se o editor que o comando `git commit` abre não é o seu preferido, é só usar a configuração do git pra mudar:

```bash
git config --global core.editor "nano -w"
```

# Anatomia de uma mensagem 🦴

---

```zsh
Resumo curto que descreve o commit

Descrição mais detalhada do que o commit faz.

Explicação do "porque" das mudanças sendo feitas.

Um rodapé com referências.
```

# O resumo 🤏

---

> Descrição consisa do que o commit faz

## Regras 📜

---

1. Limite o resumo a 50 caracteres
2. Inicie com letra maiúscula e termine sem pontuação
3. Escreva no imperativo

## Dicas

---

- Seu resumo deve encaixar na frase

> Se esse commit for aplicado ele ...

- Especifique o tipo do commit com uma palavra ou um emoji

> bug: Corrige banner aparecendo duas vezes
> 🌈 Aumenta margem no grid de usuários

# O Corpo 🧍

---

> Explica o quê e o porquê

## Regras 📜

---

1. Deixe uma linha em branco entre o resumo e o corpo
2. Limite as linhas a 72 caracteres
3. Não explique o como. Quem deve fazer isso é o código

# O Footer

---

> Referências, issue tracker, pr, etc

# Fontes e leitura adicional

---

[How to write a commit message](https://chris.beams.io/posts/git-commit/)

[Telling stories through your commits](https://blog.mocoso.co.uk/talks/2015/01/12/telling-stories-through-your-commits/)

[A Branch in Time (a story about revision histories)](https://tekin.co.uk/2019/02/a-talk-about-revision-histories)

[gitmoji | An emoji guide to your commit messages](https://gitmoji.carloscuesta.me/)

[Semantic commit messages](https://seesparkbox.com/foundry/semantic_commit_messages)

