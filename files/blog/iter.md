---
title: "Diversão com iteradores em Lua"
date: 2024-04-10
---

Você provavelmente conhece o `for` em Lua. Se quiser iterar sobre um vetor,
você pode usá-lo em sua forma numérica e sem graça, ou usando um iterador:

```lua
for i = 1, #tbl do
  print(tbl[i])
end

for i, e in ipairs(tbl) do
  print(e)
end
```

`ipairs` é uma iterador da biblioteca padrão de Lua, que pode ser usada no lado
direito do `for`. Mas não é a única. Também temos a função `io.lines`, que
itera sobre todas as linhas de um arquivo:

```lua
for line in io.lines("poem.txt") do
  print(line)
end
```

## Nosso iterador

No post passado, aprendemos como iniciar um servidor TCP para agir como um
servidor HTTP. Seria útil ler o que o cliente manda pra gente nos _headers_.

Os _headers_ de uma requisição HTTP aparecem 1 por linha, então vamos buscar
uma solução semelhante ao `io.lines`. Um iterador em Lua precisa retornar uma
função, que, ao ser chamada, retona o próximo valor, ou `nil` se chegou ao fim.

Vamos ler uma linha do cliente usando o método `:receive()` sem nenhum parâmetro.
Se a linha for vazia, retornamos `nil`, senão, retornamos a linha. Se o cliente
chegar ao fim da transmissão, a linha já será `nil`.

```lua
local function lines(client)
  return function()
    local line = client:receive()

    if line == "" then 
      return nil 
    end

    return line
  end
end
```

## Resultado final

Com o nosso iterador, podemos incrementar o servidor que criamos no último [post](http.md) para ler os _headers_ da requisição:

```lua
local socket = require "socket"

local server = socket.bind("*", 3000)

while true do
  local client = server:accept()
  local headers = {}

  local request_line = client:receive()

  for line in lines(client) do
    local name, value = line:match "^(.-):%s*(.*)$"
    headers[name] = value
  end

  client:send("HTTP/1.1 200 OK\r\n\r\n")
  client:close()
end
```
