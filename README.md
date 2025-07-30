# Teste Técnico – Desenvolvedor Front-End

Bem-vindo ao teste técnico para a vaga de Desenvolvedor Front-End!  
Este desafio tem como objetivo avaliar sua capacidade de compreender e evoluir um sistema existente, aplicando boas práticas, organização e domínio das tecnologias propostas.

---

## ✅ Objetivo Geral

Você receberá um projeto base com algumas funcionalidades já implementadas. A partir dele, deverá:

- Entender a estrutura existente  
- Adicionar novas funcionalidades  
- Manter consistência, qualidade do código e arquitetura dos componentes com React Composition
- Adotar boas práticas modernas do ecossistema React/Next.js


## 🧰 Tecnologias e Ferramentas Utilizadas

O projeto base utiliza:

- **Next.js 13+** (App Router)  
- **TypeScript**  
- **Zustand** (estado global)  
- **Vanilla Extract** (estilização)  
- **React Hook Form** (formulários)  
- **Zod** (validação de esquemas)  
- **TanStack** (Requisições) 
- **JSON Server** (API fake)

---

## ⚙️ Requisitos do Ambiente

Garanta que seu ambiente tenha:

- Node.js 18+  
- npm ou yarn

---

## 📚 Estrutura de Dados

```ts
// Modelo de uma central
central: {
  id: number,
  name: string,
  modelId: number,
  mac: string
}

// Modelo de um modelo de central
model: {
  id: number,
  name: string
}
```

---

## 🧠 O Que Esperamos de Você

- Código limpo e organizado  
- Boas práticas com componentes reutilizáveis  
- Uso adequado do estado global com `Zustand` e do `TanStack` 
- Boa separação de responsabilidades  
- Responsividade mínima e UX consistente  
- Utilizar o pattern React Composition na criação de novos componentes

---

## 🚧 Desafios Técnicos

### 1. Navegação e Roteamento

- Adicione uma nova rota acessível pelo menu lateral chamada **"Centrais"**  
- Utilize o **App Router** do Next.js 13+ para estruturar as páginas

### 2. Tela de Listagem de Centrais

- Consuma os dados via TanStack Query do endpoint `/centrals`
- Liste todas as centrais em uma tabela
- Paginação na listagem das centrais
- Select para selecionar a quantidade de items exibidos por página
- Permita ordenar por **Nome** e **Modelo** (crescente/decrescente)
- Tenha um campo de busca por Nome e Modelo
- Mostre o nome do modelo relacionado (`/models`)
- Tenha um botão de exclusão com confirmação via modal
- Após exclusão, atualize automaticamente a listagem e o contador no header
- Tenha um botão de **"Criar Central"**, que redireciona para a tela de criação

### 3. Formulário de Criação de Central

- Página para criar novas centrais, contendo:
  - Campo **Nome** (mínimo 3 caracteres)
  - Campo **MAC** (formato `XX:XX:XX:XX:XX:XX` – deve ser único)
  - Select dinâmico de **Modelo**, carregado do endpoint `/models`
- Validações obrigatórias com **React Hook Form** e **Zod**, mostrando possíveis erros nos campos
- Usar o **TanStack** para a requisição.
- Submissão via **POST** no endpoint `/centrals`
- Após submissão, redirecionar para a listagem e atualizar contador

### 4. Contador no Header

- Adicione um contador no topo da aplicação que exiba o número total de centrais cadastradas
- Deve ser atualizado automaticamente após inserções e exclusões
- Utilize **Zustand** para compartilhar o estado com o header

### 5. Edição de Centrais

- Permita editar uma central existente
- Ao clicar em uma central na listagem, redirecione para uma tela de edição
- Formulário deve ser pré-preenchido com os dados da central
- Validações idênticas à tela de criação
- Usar o  **TanStack**  para a requisição
- Atualize os dados via **PUT** e sincronize contador e listagem


## ✨ Desafios Extras (Opcionais)

Caso você conclua os requisitos principais e deseje demonstrar um conhecimento ainda mais avançado, sinta-se à vontade para implementar uma ou mais das funcionalidades abaixo:


###  Undo para Exclusão  

Após excluir uma central, exiba uma notificação com a opção de **desfazer** a exclusão (dentro de alguns segundos).  
Caso o usuário clique em “Desfazer”, restaure a central excluída.


### Exportação para CSV  

Adicione a funcionalidade de **exportar a listagem de centrais** para um arquivo `.csv`.

- O arquivo deve conter: Nome, MAC e Modelo
- Deve respeitar filtros e ordenações ativas na listagem (se houver)
- O nome do arquivo pode seguir o padrão: `centrals-export-[data].csv`


###  Filtros Avançados com Multiseleção  

Implemente filtros combinados com **multiseleção de modelos** (ex: checkboxes para escolher vários modelos ao mesmo tempo).

- Filtros devem se aplicar dinamicamente à listagem
- Permita limpar filtros com facilidade

---

## 📌 Considerações Finais

- Organização do projeto é tão importante quanto a implementação
- Foque primeiro nas funcionalidades básicas propostas
- Use componentes reutilizáveis, organize sua arquitetura e aproveite ao máximo os recursos das ferramentas mencionadas
- Liberdade para aplicar novas funcionalidades, melhorias na arquitetura, adição de testes (unitários ou e2e) e etc.

## 🛠️ Sobre o repositorio

- Crie um repositório público no seu GitHub e clone este projeto para lá. Compartilhe o link com a gente ao final.
- Utilize boas práticas de Git, com commits pequenos e mensagens claras que descrevam bem cada etapa da implementação.

