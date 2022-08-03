---
title: Como burlar o firewall da UnB Tutorial [Atualizado 2022]
date: 2022-08-01
---

![hackerman](/images/hackerman.jpg)

Aula voltou presencial na UnB. Agora eu tenho que _sair de casa_ 🙄 e usar a 
internet da UnB pra trampar e fazer trabalhos. A internet é até ok. A parte 
legal é que o meu estágio usa serviços em portas não ortodoxas. E o firewall 
da UnB não gosta disso.

## VPN

Comecei a buscar soluções. Uma VPN seria uma boa, mas todas são tão caras e eu
sou um universitário quebrado. Mas eu sou programador porr\*, eu deveria
conseguir subir minha própria VPN.

Dei uma pesquisada e me deparei com esse
[tutorial](https://blogs.oracle.com/developers/post/launching-your-own-free-private-vpn-in-the-oracle-cloud)
pra subir uma OpenVPN na Oracle Cloud. Como já tinha uma servidor de minecraft
lá, foi bem fácil subir a VPN. Segui os passos e pronto.

Parecia bom de mais para ser verdade. E era. A rede da UnB bloqueou todas as
tentativas de me conectar 😢. Mas eu sou brasileiro e não desisto (mentira kk).
Dei uma pesquisada e encontrei o
[sshuttle](https://github.com/sshuttle/sshuttle). Vou deixar a descrição dessa
ferramenta verbatim.

> Transparent proxy server that works as a poor man's VPN. Forwards over ssh.
> Doesn't require admin. Works with Linux and MacOS. Supports DNS tunneling.

Parecia bom de mais pra ser verdade. Mas dessa vez era verdade. A ferramenta é
tão boa que eu nem precisei fazer nada de mais no servidor. Desde que tenha ssh
(o Oracle Cloud faz isso pra mim) e python (qual distro não vem com python??),
tá tudo feito.

## Conclusão

`sshuttle` me salvou no estágio. Mas nem uso mais. Quando minha fyp ficou muito
ruim do nada, tentei setar uma VPN _de verdade_ ™. Descobri o
[Tailscale](https://tailscale.com/) e subi outro server (como? descubra).
Infelizmente o TikTok é muito mais esperto e a VPN não funcionou, mas pelo menos
funciona pra driblar a rede da UnB.

Então se precisar acessar serviços bloqueados ou jogar um lolzinho na rede da
UnB, tente subir um servidor qualquer e usar o `sshuttle`. Se precisar de algo
mais robusto, vai de `tailscale`.

## Bônus

Usem [uBlock Origin](https://ublockorigin.com/) na rede da UnB. Não só bloqueiem
os anúncios mas também o JS e mídia grande. É incrível como a navegação fica
mais rápida.
