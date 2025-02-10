# ISP Management System

Sistema completo de gerenciamento para provedores de internet, desenvolvido com React, TypeScript e Material-UI.

## Funcionalidades

- 📊 Dashboard com métricas importantes
- 👥 Gestão de Clientes
- 📍 Controle de Pontos de Acesso
- 🔧 Gerenciamento de Equipamentos
- 📝 Ordens de Serviço
- 💰 Controle Financeiro
- 👤 Gestão de Usuários e Permissões

## Tecnologias Utilizadas

- React 18
- TypeScript
- Material-UI (MUI)
- React Router
- React Query
- Chart.js
- Prisma (ORM)
- PostgreSQL

## Pré-requisitos

- Node.js 18+
- PostgreSQL

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/isp-system.git
cd isp-system
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```
Edite o arquivo `.env` com suas configurações.

4. Execute as migrações do banco de dados:
```bash
npx prisma migrate dev
```

5. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## Estrutura do Projeto

```
isp-system/
├── src/
│   ├── components/     # Componentes reutilizáveis
│   ├── pages/         # Páginas da aplicação
│   ├── theme/         # Configuração do tema
│   ├── routes/        # Configuração de rotas
│   ├── types/         # Tipos TypeScript
│   └── utils/         # Funções utilitárias
├── prisma/
│   └── schema.prisma  # Schema do banco de dados
└── public/            # Arquivos estáticos
```

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a build de produção
- `npm run preview` - Visualiza a build de produção localmente
- `npm run lint` - Executa o linter

## Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
