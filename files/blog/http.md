---
title: "Um servidor HTTP em Lua"
date: 2024-03-25
---

HTTP talvez seja o protocolo de aplicação mais ubíquo. Mas você sabe como
funciona? Conseguiria escrever seu próprio servidor?

# Anatomia de uma mensagem HTTP 1.1

Uma requisição HTTP parece mais ou menos com isso:

```
GET /about.html HTTP/1.1
```

Essa linha é uma _request line_:

- `GET` é um _verbo_. Indica qual ação você quer executar no servidor.
- `/about.html` é um _caminho_. Indica qual recurso o cliente deseja acessar no
  servidor.
- `HTTP/1.1` é a _versão_ que o cliente suporta. Nesse artigo vamos focar na
  versão 1.1.

Nosso servidor pode responder com algo como:

```
HTTP/1.1 200 OK
Content-Length: 12

Hello World!
```

- `200 OK` é o código de _status_ e indica se houve sucesso ou erro na
  requisição. HTTP tem muitos _status_, incluindo o código 418 I'm a teapot.
- `Content-Length: 12` é um cabeçalho, e indica o tamanho do nosso corpo. Nesse
  caso, 12 bytes.
- `Hello World!` é o corpo da nossa resposta.

# Sockets

HTTP utiliza TCP como camada de transporte. Para isso vamos precisar criar um
_socket_ e atribuir a uma porta. Como estamos usando Lua, vamos utilizar a
biblioteca, adivinha, [`lua-socket`](site do lua socket).

É provável que essa biblioteca estaja incluída no gerenciador de pacotes da sua
distro (caso esteja utilizando linux). Se não, é possível instalar utilizando
[luarocks](https://luarocks.org).

## Criando um socket TCP

Precisamos falar pro nosso OS que aceitamos conexões em uma determinada porta.
A função bind faz exatamente isso. O primeiro argumento é qual IP da interface.
Vamos usar "\*" para permitir qualquer interface. O segundo argumento é a
porta. Vamos utilizar um número sensível como 3000.

```lua
local socket = require "socket"

local server = socket.bind("*", 3000)
```

## Lidando com clientes

Se tudo tiver ido bem obtivemos a porta 3000 para nós. Agora vamos ouvir o que
os clientes tem para nos dizer. Fazemos isso com o método `accept` do servidor
que criamos.

Depois de aceitar um cliente, é possível ler o que está sendo transmitido
utilizando o método do cliente `receive`. Chamando sem argumentos, vamos ler
linha a linha. Para ler de outras maneiras, da uma olhada na documentação.

```lua
while true do
  local client = server:accept()

  local request_line = client:receive()
  print(request_line)

  client:close()
end
```

Rodando o código e enviando uma requisição com `curl http://localhost:3000`,
nosso servidor apenas ecoa a _request line_ e imediatamente fecha a conexão.

## Respondendo que nem gente

Seria uma maravilha se os servidores se comportassem assim como o nosso. Nosso
tutorial estaria pronto e ninguém ficaria viciado no TikTok, já que o servidor
nunca responderia com vídeos a sua requisição.

Mas o cliente espera uma resposta. Vamos utilizar o método `send` do cliente
para enviar dados.

```lua
client:send("HTTP/1.1 200 OK\r\n\r\n")
```

Nosso servidor agora responde devidamente os clientes. Mas você deve estar se
perguntando :thinking:, o que são esses `\r\n\r\n` no final da mensagem. Isso é
como o protocolo indica que uma mensagem chegou ao fim.
