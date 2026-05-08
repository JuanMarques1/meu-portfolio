# Portfólio · Juan Oliveira Marques

Portfólio pessoal com estética terminal-tech, construído com React (via CDN) e CSS puro — sem build step, sem dependências locais.

## Estrutura

```
meu portfolio/
├── index.html          # entrada da aplicação
├── css/
│   └── styles.css      # estilos e tokens de tema
└── js/
    ├── i18n.jsx        # dicionário de conteúdo PT/EN
    ├── components.jsx  # componentes React das seções
    ├── console.jsx     # console easter egg
    └── tweaks-panel.jsx # painel de ajustes (dev)
```

## Tecnologias

- **React 18** — carregado via CDN (sem build)
- **Babel Standalone** — transpila JSX no browser
- **CSS custom properties** — sistema de tokens para temas claro/escuro
- **IntersectionObserver** — animações de entrada ao rolar

## Funcionalidades

- Tema **claro / escuro** com transição suave
- **Bilíngue** — alternância entre PT e EN
- Animações de **reveal ao scroll** em todas as seções
- Layout **responsivo** (mobile-first a partir de 480px)
- **Easter egg** — digite `sudo` em qualquer lugar da página para abrir o console interativo

## Seções

| # | Seção | Descrição |
|---|-------|-----------|
| 01 | Sobre | Apresentação e estatísticas |
| 02 | Stack | Habilidades agrupadas por categoria |
| 03 | Projetos | Repositórios em destaque do GitHub |
| 04 | Trajetória | Linha do tempo acadêmica e profissional |
| 05 | Contato | Email, GitHub e LinkedIn |

## Como rodar

Abra `index.html` diretamente no navegador — não requer servidor ou instalação.

> Para evitar restrições de CORS ao carregar os arquivos `.jsx`, use um servidor local:
> ```bash
> npx serve .
> # ou
> python -m http.server 8080
> ```

## Contato

- Email: juanoliveira549@gmail.com
- GitHub: [github.com/JuanMarques1](https://github.com/JuanMarques1)
- LinkedIn: [linkedin.com/in/juan-oliveira-marques](https://www.linkedin.com/in/juan-oliveira-marques/)
