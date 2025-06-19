# Sistema de Gestão de Obras e Fiscalizações

## 📝 Descrição
API para gerenciamento de obras civis e suas fiscalizações, com funcionalidades de CRUD, relacionamento entre entidades e envio de relatórios por e-mail.

## 🛠️ Instalação e Execução

### Pré-requisitos
- Node.js (v14+)
- MongoDB (local ou Atlas)
- NPM ou Yarn

### Passos para instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd <nome-do-projeto>
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto com:
```env
MONGO_URI=...
EMAIL_USER=...
EMAIL_PASS=...
```

4. Inicie o servidor:
```bash
npm start
# ou
yarn start
```

## 🌐 Rotas da API

### Obras (`/obras`)

#### Criar obra (POST)
**Payload exemplo:**
```json
{
  "nome": "Ponte Rio-Niterói",
  "responsavel": "Construtora XYZ",
  "dataInicio": "2023-01-15",
  "localizacao": {
    "latitude": -22.9035,
    "longitude": -43.2096
  },
  "descricao": "Reforma da ponte Rio-Niterói"
}
```

#### Listar todas as obras (GET)
Retorna um array com todas as obras cadastradas.

#### Obter obra por ID (GET `/obras/:id`)
Retorna os detalhes de uma obra específica.

#### Atualizar obra (PUT `/obras/:id`)
**Payload exemplo:**
```json
{
  "responsavel": "Nova Construtora LTDA",
  "dataFim": "2023-12-31"
}
```

#### Deletar obra (DELETE `/obras/:id`)
Remove uma obra do sistema.

### Fiscalizações (`/fiscalizacoes`)

#### Criar fiscalização (POST)
**Payload exemplo:**
```json
{
  "data": "2023-11-15",
  "status": "Em andamento",
  "observacoes": "Fiscalização da fundação da obra",
  "localizacao": {
    "latitude": -23.5505,
    "longitude": -46.6333
  },
  "foto": "https://url...", 
  "obra": "615a1b9e8d8a9b2a1c4b5e1f" 
}
```

#### Listar fiscalizações (GET)
Retorna todas as fiscalizações cadastradas, com informações da obra relacionada.

#### Obter fiscalização por ID (GET `/fiscalizacoes/:id`)
Retorna os detalhes de uma fiscalização específica.

#### Atualizar fiscalização (PUT `/fiscalizacoes/:id`)
**Payload exemplo:**
```json
{
  "status": "Concluída",
  "observacoes": "Todas as verificações foram realizadas"
}
```

#### Deletar fiscalização (DELETE `/fiscalizacoes/:id`)
Remove uma fiscalização do sistema.

### Rotas Relacionadas

#### Listar fiscalizações por obra (GET `/obras/:id/fiscalizacoes`)
Retorna todas as fiscalizações relacionadas a uma obra específica.

#### Enviar relatório por email (POST `/obras/:id/enviar-fiscalizacoes`)
**Payload exemplo:**
```json
{
  "email": "engenheiro@construtora.com"
}
```

## 🏗️ Estrutura do Projeto
```
.
├── app.js              # Ponto de entrada da aplicação
├── models/
│   ├── Obra.js         # Modelo de dados para obras
│   └── Fiscalizacao.js # Modelo de dados para fiscalizações
├── controllers/
│   ├── obraController.js        # Lógica para rotas de obras
│   └── fiscalizacaoController.js # Lógica para rotas de fiscalizações
├── routes/
│   ├── obras.js           # Rotas para obras
│   └── fiscalizacoes.js   # Rotas para fiscalizações
└── services/
    └── emailService.js    # Serviço de envio de emails
```
