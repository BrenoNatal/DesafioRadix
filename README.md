# DesafioRadix

## Tabela de Conteúdo

 1. Objetivo do Projeto
 2. Arquitetura
 3. Acesso e Execução do código
 4. Rotas da API
 5. Autores
 

## Objetivo do Projeto

O objetivo deste projeto é a criação de uma API que irá receber valores de diversos sensores, armazenar esses dados em um banco de dados e permitir a consulta desses valores.
    Além disso, uma aplicação no front para apresentar gráficos e tabela dos valores médios desses sensores.
	


## Arquitetura
### Arquitetura
O projeto foi desenvolvido em duas frentes: o back e o front. No back foi feito os serviços de registro e consulta de eventos e equipamentos ligados ao banco de dados.
No front foi consumida a API feita no back para consultar os valores médios de cada equipamento em um determinado período de tempo.
### Stack Utilizada
- Back implementado em JavaScript utilizando sequelize
- Linguagem do Banco de dados utilizado é o sqLite
- Bibliotecas usadas no back:
  - cors
  - csvtojson
  - dotenv
  - express
  - express-fileupload
  - express-validator
  - node-dev
  - sequelize
  - sqlite3
- No front foi utilizado framework next com TypeScript
  - Bibliotecas usadas no front
  - Recharts

## Acesso e Execução do código
### Instalação

``` bash
$ git clone https://github.com/BrenoNatal/DesafioRadix.git
```    

Depois de clonar o repositorio mudadamos no terminal *para pasta do repositorio para fazer isso no terminal usamos o seguinte comando.

``` bash
$ cd DesafioRadix
```     

Vamos Instalar as dependias do front e back

``` bash
$ cd back
$ npm install
$cd ..
$ cd front
$ npm install
```     

### Rodar o back
``` bash
cd back
cp .env.example .env
npm run migrate
npm start
```
Podemos configura as variaveis do ambiente acessando o arquivo .env.

### Rodar o front
``` bash
cd front
npm run dev
```

## Rotas da API
```
post: http://localhost:3333/event
```
Cria um evento com base nos parâmetros passados no body da requisição:

- equipmentId:string
- value:number
- timestamp:date

```
post: http://localhost:3333/eventCSV
```
Cria os eventos com base no arquivo csv enviado na requisição.
```
get: http://localhost:3333/event/:days
```
Retorna o valor médio registrado de cada equipamento com base no parâmetro days passado na url.

```
post: http://localhost:3333/equipment
```
Cria um equipamento com base no parâmetro passado no body da requisição.
- equipmentId:string

```
post: http://localhost:3333/equipment
```
Cria os equipamento com base no arquivo csv enviado na requisição.


## Autores

* Breno Natal
