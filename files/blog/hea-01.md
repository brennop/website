---
title: HEAnV #01
date: 2023-07-26
---

Sete anos mexendo no vim e ainda há coisas novas a se aprender. Hoje descobri
algumas e decidi criar isso aqui, pra compartilhar esses aprendizados.

Aparentemente, o neovim atribui alguns padrões quando você ativa uma lsp, mais
especificamente, da documentação da versão 0.10, `help lsp-config`:

```
                                                        *lsp-config*
                                                        *lsp-defaults*
When the LSP client starts it enables diagnostics |vim.diagnostic| (see
|vim.diagnostic.config()| to customize). It also sets various default options,
listed below, if (1) the language server supports the functionality and (2)
the options are empty or were set by the builtin runtime (ftplugin) files. The
options are not restored when the LSP client is stopped or detached.

- 'omnifunc' is set to |vim.lsp.omnifunc()|, use |i_CTRL-X_CTRL-O| to trigger
  completion.
- 'tagfunc' is set to |vim.lsp.tagfunc()|. This enables features like
  go-to-definition, |:tjump|, and keymaps like |CTRL-]|, |CTRL-W_]|,
  |CTRL-W_}| to utilize the language server.
- 'formatexpr' is set to |vim.lsp.formatexpr()|, so you can format lines via
  |gq| if the language server supports it.
  - To opt out of this use |gw| instead of gq, or set 'formatexpr' on LspAttach.
- |K| is mapped to |vim.lsp.buf.hover()| unless |'keywordprg'| is customized or
  a custom keymap for `K` exists.
```

# O que isso significa

- O complete do neovim já usa a LSP com <kbd>Ctrl</kbd><kbd>x</kbd><kbd>Ctrl</kbd><kbd>o</kbd>
- As tags do neovim também usam a LSP:
    * <kbd>Ctrl</kbd><kbd>]</kbd>: abre a definição
    * <kbd>Ctrl</kbd><kbd>w</kbd><kbd>]</kbd>: abre a definição em um split
    * <kbd>Ctrl</kbd><kbd>w</kbd><kbd>}</kbd>: abre a definição em um preview
    * <kbd>Ctrl</kbd><kbd>t</kbd>: volta na pilha de tags

No frigir dos ovos, não preciso mais de um plugin de autocomplete, nem
configurar mapeamento para `go-to-definition` ou `hover`. E ainda por cima,
consigo abrir a definição em outro split ou tab, sem poluir meu buffer.
