# Default Files Script Automation

- [Como esse projeto funciona?](#como-esse-projeto-funciona)
- [Como funcionam as opções?](#como-funcionam-as-opções)
- [Após executar o script, o que devo mudar no código?](#após-executar-o-script-o-que-devo-mudar-no-código)
- [O que o arquivo configura tanto?](#o-que-o-arquivo-configura-tanto)
- [Depêndencias utilizadas?](#depêndencias-utilizadas)
- [Possíveis Erros](#possíveis-erros)

<!--

Esse projeto, será onde ficara hospedado meus arquivos de configuração de projetos no NodeJs
Esse projeto será usado pelo projeto: [Script Confi Project](https://github.com/ramonpaolo/script-confi-project), para uso próprio.

-->


<br>

# Como esse projeto funciona?
O arquivo shell script, irá determinar quais arquivos vão ser baixados, conforme as opções que o usuário escolheu.

Existem as seguintes opções:
- Escolher se docker deverá estar no projeto
- Escolher se dependências de banco de dados vão ser baixadas
- Escolher se irá utilizar HTTP/2.0 para setar o NGINX e o NodeJs(Express)
- Escolher se irá utilizar alguma cloud(AWS/Firebase)

Após selecionar as 4 opções, o script irá executar os devidos comandos para setar o projeto todo, automaticamente.

O script faz nada menos, do que um jogo de if/else para baixar arquivos/dependências que o usuário irá precisar.

<br>

# Como funcionam as opções?
## Docker
A opção de escolher se o docker vai estar no projeto, irá fazer com que o arquivo baixe alguns arquivos dockerfile, e o arquivo docker-compose-dev.yaml e docker-compose.yaml, com 2 serviços já presentes, sendo eles o NodeJs, e o NGINX, para Load Balance e Proxy Reverse.

<br>

## HTTP/2.0
Caso você escolha utilizar a versão HTTP/2.0 no projeto, o arquivo index.ts baixado pelo script, será diferente, e baixará um novo pacote do npm, que é o SPDY, que habilita o uso do HTTP/2.0 com o Express.

Junto com setar o Express para HTTP/2.0, ele irá também, criar os certificados SSL, e irá baixar um arquivo nginx.conf diferente, um que permite a conexão SSL.

<br>

## Banco de dados
Essa opção, irá apenas baixar algumas dependências a mais, como o PostgreSQL, Mongoose, Ioredis, Sequelize e seus types.

<br>

## Cloud
Essa opção irá apenas baixar a dependência escolhida por você.

---

<br>

# Após executar o script, o que devo mudar no código?
Após o projeto ser totalmente criado, você deverá mudar o <kbd>package.json</kbd>, e adicionar o seguinte campo/field:
```json
{
 "scripts": {
      "dev": "nodemon -L ./src/index.ts",
      "build": "tsc",
      "start": "node ./dist/index.js"
  }
}
```

Após isso, você deverá mudar os arquivos <kbd>docker-compose-dev</kbd> e <kbd>docker-compose.yaml</kbd>, sobre os campos:
```yaml
version: '3.8'
services:
    nodejs:
        #...
        container_name: \*/
        image: r4deu51\
    #....
    nginx:
        #....
        container_name: \*/
        image: r4deu51\
    #....
```
Colocando o nome do container que desejar e mudar o nome da imagem.

<br>

Após isso, seu projeto poderá ser executado com os seguintes comandos em development, com reload automático na aplicação NodeJs:
```bash
$ docker-compose -f docker-compose-dev.yaml up --build -d
```

E no ambiente de production:
```bash
$ docker-compose up --build -d
```

---

# O que o arquivo configura tanto?
O arquivo shell, configura o seguinte:
- Git Commitizen
    - Git Commitizen é utilizado para fazer commits padronizados
    - Para usar o commitizen, basta digitar no terminal no diretório do projeto: <kbd>git cz</kbd>
    - O arquivo criado para permitir o uso do Git Commitizen, é o <kbd>.czrc</kbd>
- Docker
    - Configura dois serviços para já poderem ser utilizados: NodeJs e NGINX
    - Cria além dos dockerfiles, dois arquivos docker-compose, um para produção, e outro para desenvolvimento
- Eslint
    - Algumas regras de código que utilizo em meus projetos
- HTTP/2.0
    - É utilizado o SPDY módulo
    - Funciona com o Express(Middlewares)
    - Também, é criado certificados SSL para o funcionamento da lib
- Arquivo básico de funcionamento NodeJs
    - <kbd>index.ts</kbd> com um endpoint raiz que retorna um JSON para ver se o projeto está funcionando
    - Configura libs para acesso do Express
        - CORS
        - Express-Rate-Limit
        - SPDY
        - Compression(GZIP)
        - Dotenv
- Baixa as dependências necessárias conforme o usuário selecionou
- Configura um README.md padrão para o projeto
- Configura o <kbd>tsconfig.json</kbd>

# Depêndencias utilizadas
```json
{
    //...
    "dependencies": {
    "axios": "",
    "compression": "",
    "cors": "",
    "dotenv": "",
    "eslint": "",
    "express": "",
    "express-rate-limit": "",
    "jest": "",
    "spdy": "",
    "typescript": ""
  },
  "devDependencies": {
    "@types/compression": "",
    "@types/cors": "",
    "@types/express": "",
    "@types/jest": "",
    "@types/spdy": "",
    "@typescript-eslint/eslint-plugin": "",
    "@typescript-eslint/parser": "",
    "nodemon": "",
    "ts-node": ""
  }
}
```

# Possíveis Erros
Até o momento, observei 2 possíveis erros no projeto.

1 - Problema com a porta de forwarding, para se conectar com o NGINX na porta 80/443

2 - Problema com o <kbd>tsc: command not found</kbd>, na hora de fazer o build do projeto

---

## As possíveis soluções são:

1 - Veja se tem algum container docker rodando, usando a porta 80 e a porta 443 no localhost

2 - Poderá rodar o comando <kbd>yarn install</kbd>, no terminal do projeto, assim o yarn irá atualizar o yarn.lock, que possívelmente está corrompido

---

![GitHub top language](https://img.shields.io/github/languages/top/ramonpaolo/default-files-script-automation)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/ramonpaolo/default-files-script-automation)
![GitHub](https://img.shields.io/github/license/ramonpaolo/default-files-script-automation)