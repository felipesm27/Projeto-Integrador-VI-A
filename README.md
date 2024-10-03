# ProjetoMVCnode-

Projeto Integrador UCPEL VI-A - MVC Node

# Sistema de Gerenciamento de Alunos

Este é um projeto de gerenciamento de alunos desenvolvido com Node.js, Express, Sequelize e PostgreSQL. O sistema permite o cadastro e gerenciamento de alunos, responsáveis, projetos e monitores.

## Índice

- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Executando o Projeto](#executando-o-projeto)
- [Uso](#uso)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Licença](#licença)

## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em seu sistema:

- [Node.js](https://nodejs.org/) (incluindo o npm)
- [PostgreSQL](https://www.postgresql.org/download/)
- [Git](https://git-scm.com/) (para clonar o repositório)

## Instalação

### 1. Clone o repositório

Abra o terminal e execute o comando abaixo para clonar o repositório em seu computador:

git clone https://github.com/joaopouey/ProjetoMVCnode-.git

### 2. Navegue até o diretório do projeto

cd ProjetoMVCnode-

### 3. Instale as dependências

Use o npm para instalar todas as dependências necessárias:

npm install

### Configuração

### 1. Configurar o banco de dados PostgreSQL

Certifique-se de que o PostgreSQL está em execução em seu computador.
Crie um banco de dados chamado sistema_gerenciamento_alunos (ou outro nome, conforme preferir):

CREATE DATABASE sistema_gerenciamento_alunos;

Crie um usuário para o banco de dados:

CREATE USER usuario_com_senha WITH PASSWORD 'senha';
GRANT ALL PRIVILEGES ON DATABASE sistema_gerenciamento_alunos TO usuario_com_senha;

### 2. Configurar variáveis de ambiente

Crie um arquivo .env na raiz do projeto com as seguintes configurações:

DB_HOST=localhost
DB_USER=usuario_com_senha
DB_PASSWORD=senha
DB_NAME=sistema_gerenciamento_alunos
DB_PORT=5432

### 3. Sincronizar o banco de dados

O Sequelize será configurado para sincronizar os modelos do banco de dados automaticamente ao iniciar o projeto.

### Executando o Projeto

Para iniciar o projeto, use o seguinte comando:

npm run dev

Após iniciar o servidor, o projeto estará disponível em http://localhost:3000.

Uso
Acesse a página inicial no navegador e utilize a barra de navegação para acessar as diferentes funcionalidades do sistema, incluindo gerenciamento de alunos, responsáveis, projetos e monitores.
As alterações feitas no sistema serão refletidas no banco de dados PostgreSQL configurado.
Tecnologias Utilizadas
Node.js: Ambiente de execução para JavaScript.
Express: Framework para Node.js.
Sequelize: ORM para Node.js, utilizado para interagir com o banco de dados.
PostgreSQL: Sistema de gerenciamento de banco de dados relacional.
EJS: Template engine para renderizar as views.
Bootstrap (opcional): Para estilização das páginas, se estiver incluído no projeto.

## Alterações Recentes

- **Correção de Exibição de Monitores**: Ajustei o código para garantir que o nome dos monitores fosse exibido corretamente na tabela de projetos.
- **Verificação de Dados no Banco de Dados**: Assegurei que a associação entre projetos e monitores no banco de dados estivesse correta, garantindo que o campo `monitor_id` fosse armazenado corretamente.
- **Melhorias no Controller**: Adicionei verificações no controller para garantir que os monitores fossem incluídos corretamente ao listar projetos e que as respostas fossem adequadas nas operações de criação, atualização e exclusão.
- **Ajustes na View (EJS)**: Alterei o código responsável por exibir o nome do monitor nos projetos e incluí a lógica de edição, garantindo que as informações fossem carregadas corretamente ao editar.
- **SweetAlert**: Para melhorar a interação com o usuário, adicionei o [SweetAlert](https://sweetalert.js.org/) ao projeto, substituindo os alertas padrões do navegador por alertas mais estilizados e amigáveis.
- **Atualizações de Exclusão**: Corrigi a lógica de exclusão para que as mensagens de feedback fossem exibidas corretamente após a tentativa de exclusão, garantindo que o usuário soubesse se a operação foi bem-sucedida ou não.
- **Recarregamento da Página**: Implementei o recarregamento da página após a exclusão de registros, para que a interface do usuário sempre exibisse os dados mais recentes.

Licença
Este projeto é licenciado sob a MIT License.
