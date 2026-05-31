---
slug: agents
date: 2026-05-31
---

Estou mudando meu título de engenheiro de software para babá de agentes.
Eu nem gosto muito de codar com IA, mas com a atual expectativa dos superiores
não me restam alternativas. Além disso, sobra mais tempo pra ver tiktok.

Ainda asssim, não queria deixar essa caixa preta me dominar. Queria entender
como funciona. Então fiz o que sempre faço: tentei fazer o meu próprio.

# number go up

Desde a primeira vez que ouvi a palavra agente no contexto de IA já senti um
trem ruim. Um misto de confusão com a certeza que tão me enganando pra aumentar
algum número: engajamento, valor de mercado, etc.

Turns out agente é um trem muito simples. É só uma IA muito determinada.
Vamos recapitular o funcionamento do motor de inferência de uma LLM: um loop
de multiplicação de matriz até um token de parada.

```
function llm(context) is
    while true do
        logits = get_probability(context)
        next_token = sort(logits)[0] # amostragem gulosa 😋
        context.append(next_token)

        if next_token == EOS then
            break
    return context
```

Pra transformar a LLM em um agente, basta colocar  um loop em volta. Todo
agente tem uma _tarefa_. Ao invés de parar quando EOS, você tenta de novo, até
a tarefa estar concluída. E tá pronto seu agente!

```
function agent(task) is
    while not task.done? do
        result = llm(task.context)
        task.context.append(result)
```

# `agent.fnl`

Escolhi [fennel](fennel-lang.org/), um LISP de lua, para escrever esse agente.
Usei a lib `lua-openai` pra abstrair a comunicação com o provedor. No meu caso
o provedor é o ollama rodando na minha máquina. Estou usando o modelo
`qwen3.5:9b`, que é o que cabeu na minha gpu.

```fennel
(local oai (require :openai))

(local client (oai.new (os.getenv :OPENAI_API_KEY)))
(tset client :api_base (os.getenv :OPENAI_BASE_URL))

(local chat (client:new_chat_session {:model "qwen3.5:9b"}))
```

Agora, um [REPL](https://pt.wikipedia.org/wiki/REPL) básico:

```fennel
(each [prompt #(io.read)]
  (print (chat:send prompt)))
```

```bash
> fennel agent.fnl
say hi
Hi there! 👋 How's it going?
```

# 🛠️ tools

LLMs são apenas pesos mortos em uma VRAM, não conseguem interagir com o mundo
lá fora. Tudo que sabem é emitir texto. Por isso inventaram _tool calls_: é
como se o modelo emitisse uma procuração. Essas procurações podem conter uma
busca na web, edição de arquivo, ou até um comando bash. É dever do código do
agente atuar como procurador, realizando a ação no lugar da LLM e devolvendo o
resultado pro modelo.

```fennel
; uma definição de tool usando json schema, pro modelo saber o que é possível fazer
(local bash {:type :function
             :function {:name :bash
                        :description "Run a shell command and return its ouput"
                        :parameters {:type :object
                                     :properties {:command {:type :string
                                                            :description "The shell command to run"}}
                                     :required [:command]}}})

(local chat (client:new_chat_session {:model "qwen3.5:9b" :tools [bash]}))
```

Vamos criar algumas funções helper para lidar com tools calls. `handle-tools`
faz o decoding da requisição da LLM, enquanto `handle-tool` chama a ferramenta
correta e devolve seu resultado.

```fennel
(local agent {})

(fn agent.handle-tool [name arguments]
  (match name
    :bash (: (io.popen arguments.command) :read :*a)))

(fn agent.handle-tools [tool_calls]
  (each [_ {:function {: name : arguments} :id tool_call_id} (ipairs tool_calls)]
    (let [result (agent.handle-tool name (cjson.decode arguments))
          content (cjson.encode result)]
      (print (chat:send {:role :tool : tool_call_id : content})))))

(fn agent.handle [data]
  (match (chat:send data)
    {: tool_calls} (agent.handle-tools tool_calls)
    message message))

(each [prompt #(io.read)]
  (print (agent.handle prompt)))
```

```bash
> fennel basic.fnl
which dir am i?
You are currently in the `/workspace` directory.
```

> ⚠️ tool calls são perigosas! Inteligências artificiais são burras, e podem
> apagar seu
> [drive](https://old.reddit.com/r/google_antigravity/comments/1p82or6/google_antigravity_just_deleted_the_contents_of/),
> [banco de dados](https://x.com/lifeof_jer/status/2048103471019434248), etc.
> Rode tudo dentro de um container se quiser se proteger!

# amarrando tudo

Estamos quase lá. Segundo simonw, [um agente roda ferramentas em um loop para
atingir um objetivo](https://simonwillison.net/2025/Sep/18/agents/). Nosso
pseudoagente já roda ferramentas, só falta um loop:

```diff
-      (print (chat:send {:role :tool : tool_call_id : content})))))
+      (agent.handle {:role :tool : tool_call_id : content}))))
```

Isso criará uma recursão mútua, efetivamente criando um loop. Não se procupe
com a stack, lua possui [tail call optimization](https://en.wikipedia.org/wiki/Tail_call).

A condição de parada é o `match` do `agent.handle` não casar mais, ou seja, o
modelo não possui mais chamadas de ferramenta a fazer. Esse é um ótimo proxy para
conclusão da tarefa: ou o objetivo foi alcaçado, ou o modelo não sabe mais o
que fazer. Nesse último caso, o loop do REPL dá ao usuário a chance de
providenciar mais contexto pra tarefa, dando o ponta-pé pra mais uma aventura
do agente.

# claudio-bode

Eu achava que o claude code era um grande musse. No frigir dos ovos é só um
loop dentro de um loop. Então eu fiz meu próprio musse,
[claudio-bode](https://github.com/brennop/claudio-bode), o GOAT dos agentes.

<iframe width="560" height="315" src="https://www.youtube.com/embed/RG9TMn1FJzc?si=IqpmgtBYrxlWRYLi" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
