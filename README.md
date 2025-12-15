<head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
  <style>
    .montserrat-<uniquifier> {
      font-family: "Montserrat", sans-serif;
      font-optical-sizing: auto;
      font-weight: <weight>;
      font-style: normal;
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      color: #fc5990 !important;
      font-family: Montserrat !important;
    }
    p, b, strong {
      font-family: Montserrat !important; 
      text-indent: 2em !important;
    }
    li { 
      font-family: Montserrat !important;
    }
    hr { 
      background-color: #fc5990 !important;
      opacity: 100% !important;
      border: none !important;
      height: 1px !important;
    }
    #comando { 
      color:#fc5990 !important;
    }
    #argumento { 
      color:rgb(255, 164, 195) !important;
    }
  </style>
</head>

<div style="
    background: linear-gradient(135deg, #fc5990, #cc2e6a);
    border: 1.5px solid white;
    padding: 20px;
    color: white;
    text-align: center;
    border-radius: 12px;
    font-size: 100%;
    font-weight: 400;
    font-family: Montserrat;
  ">
Documentação - Whatsapp + Pipefy + Google Drive
</div>

<div style="
    background: white;
    width: 100%;
    height: 1px;
    margin-top: 16px;
    margin-bottom: 16px;
    border-radius: 8px;
    ">
</div>

<div style="
  border: 2px solid white;
  border-radius: 16px;
  padding: 8px;
  font-weight: 800;
  font-size: 20px;
  font-family: Montserrat;
  margin-top: 16px;
  margin-bottom: 16px;
">
Sumário
</div>

<div style="
  border: 2px solid white;
  border-radius: 16px;
  padding: 8px;
  font-family: Montserrat;
  margin-top: 16px;
  margin-bottom: 16px;
">
  <div style="
    display: flex;
    flex-direction: column;
    padding: 8px;
    text-indent: 0em !important;
  ">
    <li>
      <a href="#descricao_geral">
        1. Descrição geral do funcionamento do sistema
      </a>
    </li>
    <li>
      <a href="#objetivos">
        2. Quais são objetivos principais?
      </a>
    </li>
    <li>
      <a href="#funcoes">
        3. Quais são as funções do sistema?
      </a>
      <ul>
        <li
        style="
          text-indent: 0em !important;
        ">
          <a href="#whatsapp">
            3.1. Whatsapp
          </a>
        </li>
      </ul>
    </li>
    <li>
      <a href="#estrutura_pastas">
        4. Estrutura de pastas implementada
      </a>
    </li>
  </div>
</div>

<h2 id="descricao_geral">
  1. Descrição geral do funcionamento do sistema
</h2>
<p>
  O principal objetivo do presente bot é formalizar a comunicação entre os clientes e a Therion, oferecendo uma plataforma onde seja possível uma comunicação automática entre os membros de Comercial e o cliente, onde o bot decidiria automaticamente quem seria o membro de Comercial responsável pelo atendimento do cliente entrando em contato. Para isso, seria utilizado o Pipefy como meio de armazenar as atuais informações ocorrendo na Therion e providenciar um contexto da situação atual para o bot.
</p>
<p>
  Outras funções importantes seriam a execução de funções internas por parte dos membros de Comercial, Administrativo e Financeiro, como funções para obter as mensagens na conversa do bot com o cliente, enviar mensagens diretamente para um cliente, obter os dados do Pipefy, obter os dados de clientes a partir da <i>database</i> no Pipefy que armazenará os dados dos clientes que entram em contato conosco e outras funções de menor importância para o objetivo final, como a de criação automática de documentos a partir do bot.
</p>

<h2 id="objetivos">
  2. Quais são os objetivos principais?
</h2>
<p>
  Todas as automações entre Google Drive, Pipefy e Whatsapp possuem como principais objetivos: 

  <b>1 - Aumentar a eficiência na comunicação entre diretorias (Comercial, Administrativo e Financeiro)

  2 - Eliminar a comunicação falada nos grupos de Whatsapp 

  3 - Promover o uso indireto do Pipefy

  4 - Promover maior uso de automações para criação de documentos via Whatsapp (não é um foco principal, mas após o sistema estar implementado corretamente essas funções de criação de documento serão pesquisadas) 

  5 - Formalizar o contato entre empresa e clientes, por meio do uso de um único número de telefone

  6 - Unificar o contato entre os membros de Comercial e os clientes
  </b>
</p>

<h2 id="funcoes">
  3. Quais são as funções do sistema?
</h2>

Primeiramente, para entender as diferentes funções do sistema, é preciso entender como o sistema armazena as informações sobre as pessoas presentes no sistema, ou seja, as informações como número de telefone que representa a pessoa, *role* pertencente à pessoa e a entidade relacionada à pessoa.  

O sistema armazena tais informações em um arquivo `people_info.json` que contém como índice o número de telefone da pessoa e as propriedades sendo o nome, *role* associada e a entidade relacionada. As possíveis entidades relacionadas se limitam às entidades de [*Administrativo*], [*Comercial*] ou [*Financeiro*]. Abaixo se encontra uma rápida explicação sobre cada *role*:

> [*Administrador*]  
Representa o principal mantenedor do sistema, podendo ser o presidente, diretor de Administrativo ou eu mesmo.  
O administrador possui direitos totais sobre a aplicação.

> [*Diretor*]  
Representa o diretor de uma diretoria, podendo ser a diretoria Administrativa, Financeira ou de Comercial.   

> [*Membro*]  
Representam os membros das diretorias de Adminsitrativo, Comercial e Financeiro. Os mesmos terão as mesmas permissões para execução de funções.

> [*Cliente*]  
Representam os clientes que entrarem em contato com a gente. Não devem possuir permissão para rodar qualquer tipo de função. 

Agora, uma rápida exemplificação sobre como o arquivo `people_info.json` se parece: 

```json
{
  '+55 (43) 98438-0116': {
    name: "Arthur Massaro",
    role: "Administrador", 
    enabled_functions: null,
    entity: "Administrativo"
  },
  '+55 (43) 9999-9999': {
    name: "Zé da Silva",
    role: "Membro", 
    // O vetor enabled_functions é um vetor contendo o nome do comando adicionado para a pessoa de forma excepcional
    enabled_functions: ["get_msgs"],
    entity: "Comercial"
  }
}
```

### Whatsapp
- Redirecionar mensagens dos clientes para os membros de Comercial automaticamente
- Redirecionar mensagens dos membros de Comercial para os clientes
- Decidir automaticamente para qual membro de Comercial o cliente será redirecionado com base na quantidade de cards que cada membro de Comercial possui na fase de Comercial
- Adicionar e alterar informações dos novos leads para a database no Pipefy
- Adicionar e mover novos cards que representam leads ao pipe de Comercial
- Executar funções internas com /command. As funções, assim como em requisições, são classificadas por tipo e também possuem descrição da entidade de origem *(de onde vem)* e a entidade final *(para onde vai)*.

  <span id="get" style="color: yellow; font-weight: 600;">{GET}</span>: Obtém informações a respeito de algum escopo descrito no comando.

  <span id="patch" style="color: blue; font-weight: 600;">{PATCH}</span>: Altera informações presentes na database ou em algum card no Pipefy. 

  <span id="delete" style="color: red; font-weight: 600;">{DELETE}</span>: Deleta alguma informação da database ou informação de um card ou o próprio card em si. 

  <span id="post" style="color: green; font-weight: 600;">{POST}</span>: Adiciona um novo cliente à database do Pipefy ou um novo card ao Pipefy relacionado a um cliente existente ou não. 

  > <span id="get" style="color: yellow; font-weight: 600;">{GET}</span> <b><span id="comando">/help</span></b>  
  **Origem-Final**: [*Comercial* | *Administrativo* | *Financeiro*] -> [*Whatsapp*] -> [*Comercial* | *Administrativo* | *Financeiro*]  
  **Roles que podem executar**: [*Administrador*], [*Diretor*], [*Membro*]  
  **Descrição**: Exibe informações a respeito do bot em si e o que é possível fazer com ele, assim como explicações para os comandos que o bot consegue executar. Isto é, por conta da modularidade do bot, o bot retornaria quais as funções estão no ar, para o caso de manutenção ou melhoria de alguma função interna.  
  A informação das *roles* estará disponível num arquivo `.json`, contendo informações sobre números de telefone que representam cada pessoa em cada *role*. Por padrão, os números de telefone que não estão inclusos neste arquivo `.json` estarão definidos com a *role* de cliente, ou seja, sem possibilidade de rodar quaisquer funções internas ou externas.  
  **Exemplo**: /help

  > <span id="get" style="color: yellow; font-weight: 600;">{GET}</span> <b><span id="comando">/get_roles</span></b>  
  **Origem-Final**: [*Comercial* | *Administrativo* | *Financeiro*] -> [*Whatsapp*] -> [*Comercial* | *Administrativo* | *Financeiro*]  
  **Roles que podem executar**: [*Administrador*], [*Diretor*]  
  **Descrição**: Exibe informações a respeito das roles atribuídas a cada pessoa na diretoria de Comercial, Financeiro e Administrativo.  
  **Exemplo**: `/get_roles`

  > <span id="get" style="color: yellow; font-weight: 600;">{GET}</span> <b><span id="comando">/get_msgs</span> <span id="argumento">[num_telefone_cliente]</span></b>  
  **Origem-Final**: [*Comercial* | *Administrativo* | *Financeiro*] -> [*Whatsapp*] -> [*Comercial* | *Administrativo* | *Financeiro*]   
  **Roles que podem executar**: [*Administrador*], [*Diretor*], [*Membro*]  
  **Descrição**: *Se o comando for rodado sem argumentos, expõe uma lista clicável de números de telefone relacionados ao membro de Comercial/Administrativo/Financeiro que rodar o comando.*   
  Pode ser rodado por quaisquer membros de Financeiro, Comercial ou Administrativo para conseguir um contexto melhor para o caso de alguma dúvida.  
  **Exemplo**: `/get_msgs 43984380116`  
  
  > <span id="get" style="color: yellow; font-weight: 600;">{GET}</span> <b><span id="comando">/get_all_cards</span> <span id="argumento">[nome_fase_pipefy]</span></b>  
  **Origem-Final**: [*Comercial* | *Administrativo* | *Financeiro*] -> [*Whatsapp*] -> [*Pipefy*] -> [*Whatsapp*] -> [*Comercial* | *Administrativo* | *Financeiro*]   
  **Roles que podem executar**: [*Administrador*], [*Diretor*], [*Membro*]   
  **Descrição**: *Se o comando for rodado sem argumentos, expõe uma lista clicável dos nomes das fases presentes no Pipefy para o membro escolher qual fase ele quer obter os cards*.  
  Obtém informações mais resumidas de todos os cards relacionados aos leads ativos no Pipefy.   
  **Exemplo**: `/get_all_cards Comercial` ou `/get_all_cards comercial`  

  > <span id="get" style="color: yellow; font-weight: 600;">{GET}</span> <b><span id="comando">/get_card</span> <span id="argumento">[num_telefone_cliente]</span></b>  
  **Origem-Final**: [*Comercial* | *Administrativo* | *Financeiro*] -> [*Whatsapp*] -> [*Pipefy*] -> [*Whatsapp*] -> [*Comercial* | *Administrativo* | *Financeiro*]  
  **Roles que podem executar**: [*Administrador*], [*Diretor*], [*Membro*]  
  **Descrição**: *Se o comando for rodado sem argumentos, expõe uma lista clicável de números de telefone de todos os cards relacionados aos leads.*  
  Ao selecionar o número de um cliente, obtém todas as informações do cliente presentes no card no Pipefy.  
  **Exemplo**: `/get_card 43984380116`  

  > <span id="post" style="color: green; font-weight: 600;">{POST}</span> <b><span id="comando">/send_msg</span> <span id="argumento">[num_telefone_cliente] [mensagem]</span></b>  
  **Origem-Final**: [*Comercial* | *Administrativo* | *Financeiro*] -> [*Comercial* | *Administrativo* | *Financeiro*] -> [*Whatsapp*] -> [*Cliente*]  
  **Roles que podem executar**: [*Administrador*], [*Diretor*], [*Membro*]  
  **Descrição**: *Se o comando for rodado sem argumentos, expõe uma lista clicável de números de telefone de todos os cards relacionados aos leads.*  
  Envia uma mensagem para um cliente em específico. Caso o argumento <b><span id="argumento">[mensagem]</span></b> não seja informado na execução do comando, o comando será ignorado.  
  Uma forma mais conveniente de executar o comando de forma indireta é responder o cliente mencionando a mensagem redirecionada no bot, sem colocar '/' no início da mensagem, que o bot irá interpretar a mensagem enviada a ele como mensagem para um cliente.  
  **Exemplo**: `/send_msg 43984380116 Olá, mundo!`  

  > <span id="get" style="color: yellow; font-weight: 600;">{GET}</span> <b><span id="comando">/get_info</span> <span id="argumento">[num_telefone_cliente]</span></b>  
  **Origem-Final**: [*Comercial* | *Administrativo* | *Financeiro*] -> [*Whatsapp*] -> [*Pipefy*] -> [*Whatsapp*] -> [*Comercial* | *Administrativo* | *Financeiro*]  
  **Roles que podem executar**: [*Administrador*], [*Diretor*], [*Membro*]  
  **Descrição**: *Se o comando for rodado sem argumentos, expõe uma lista clicável de números de telefone de todos os cards relacionados aos leads.*  
  Obtém as informações de um cliente presentes na database do Pipefy.  
  **Exemplo**: `/get_info 43984380116`  

  > <span id="post" style="color: green; font-weight: 600;">{POST}</span> <b><span id="comando">/move_card</span> <span id="argumento">[num_telefone_cliente] [nome_fase_pipefy]</span></b>  
  **Origem-Final**: [*Comercial* | *Administrativo* | *Financeiro*] -> [*Whatsapp*] -> [*Pipefy*]  
  **Roles que podem executar**: [*Administrador*], [*Diretor*], [*Membro*]  
  **Descrição**: *Se o comando for rodado sem argumentos, expõe uma lista clicável de números de telefone de todos os cards relacionados aos leads.*  
  Move o card relacionado ao cliente no Pipefy. Ao mover o card no Pipefy, uma nova mensagem pode ser redirecionada a um membro de Comercial, Administrativo ou Financeiro.  
  Caso o argumento <b><span id="argumento">[nome_fase_pipefy]</span></b> não for informado, o card será movido para a próxima fase com base na atual fase dele, ou seja, se ele está na fase de Comercial, ele será movido para a fase de Financeiro e assim por diante. 
  Outra forma mais conveniente de mover o card relacionado ao lead é mencionar a mensagem redirecionada do cliente e escrever o comando.  
  **Exemplo**: `/move_card 43984380116` ou `/move_card 43984380116 Financeiro` ou `/move_card 43984380116 financeiro`

  > <span id="post" style="color: green; font-weight: 600;">{POST}</span> <b><span id="comando">/create_new_card</span> <span id="argumento">[num_telefone_cliente] [nome_fase_pipefy]</span></b>  
  **Origem-Final**: [*Comercial* | *Administrativo* | *Financeiro*] -> [*Whatsapp*] -> [*Pipefy*]  
  **Roles que podem executar**: [*Administrador*], [*Diretor*], [*Membro*]  
  **Descrição**:  *Se o comando for rodado sem argumentos, será enviada uma nova mensagem para inserir o número de telefone relacionado ao lead, que é o mínimo necessário para o comando fazer sentido.*  
  O comando serve para criar um novo card de forma mais "na mão", de forma com que seja possível adicionar o número de contato do cliente sem depender dele enviar uma mensagem pra gente. O número de telefone do novo cliente deve ser colocado sem parênteses ou hífen (-).  
  Caso o argumento <b><span id="argumento">[nome_fase_pipefy]</span></b> não seja informado na execução do comando, presume-se que o card será colocado na fase de Comercial, por se tratar de ser uma fase inicial. Mas, para o caso do lead querer um orçamento, deve ser colocado a fase "Financeiro".
  **Exemplo**: `/create_new_card 43984380116` ou `/create_new_card 43984380116 Financeiro` ou `/create_new_card 43984380116 financeiro`  

<h2 id="estrutura_pastas">
4. Estrutura de pastas implementada
</h2>

WABot/  
├── 📁 src/                          # Código fonte principal  
│   ├── 📁 domain/                   # Camada de Domínio (regras de negócio)  
│   │   ├── 📁 entities/             # Entidades do sistema  
│   │   │   ├── __init__.py  
│   │   │   ├── person.py            # Classe   Person (Cliente, Membro, etc)  
│   │   │   ├── message.py           # Classe   Message  
│   │   │   └── pipefy_card.py       # Classe PipefyCard  
│   │   ├── 📁 enums/                # Enumerações  
│   │   │   ├── __init__.py  
│   │   │   ├── role.py              # Enum Role   (Administrador, Diretor, etc)  
│   │   │   ├── entity.py            # Enum Entity (Comercial, Financeiro, etc)  
│   │   │   └── fase_pipefy.py       # Enum das fases do Pipefy  
│   │   ├── 📁 interfaces/           # Contratos/Interfaces (ABCs)  
│   │   │   ├── __init__.py  
│   │   │   ├── people_repository.py # Interface do repositório de pessoas  
│   │   │   ├── whatsapp_service.py  # Interface do serviço WhatsApp  
│   │   │   └── pipefy_service.py    # Interface do serviço Pipefy  
│   │   └── __init__.py  
│   │  
│   ├── 📁 application/              # Camada de Aplicação (casos de uso)  
│   │   ├── 📁 use_cases/            # Casos de uso específicos  
│   │   │   ├── __init__.py  
│   │   │   ├── send_message.py      # Caso de uso: enviar mensagem  
│   │   │   ├── get_messages.py      # Caso de uso: obter mensagens  
│   │   │   └── move_card.py         # Caso de uso: mover card no Pipefy  
│   │   ├── 📁 services/             # Serviços de aplicação  
│   │   │   ├── __init__.py  
│   │   │   ├── authorization.py     # Serviço de autorização  
│   │   │   └── routing.py           # Serviço de roteamento de mensagens  
│   │   ├── 📁 dtos/                 # Data Transfer Objects  
│   │   │   ├── __init__.py   
│   │   │   └── dtos.py              # Classes DTO  
│   │   └── __init__.py  
│   │  
│   ├── 📁 infrastructure/           # Camada de Infraestrutura (implementações)  
│   │   ├── 📁 whatsapp/             # Cliente WhatsApp (Meta API)  
│   │   │   ├── __init__.py  
│   │   │   └── meta_whatsapp.py     # Implementação da API Meta  
│   │   ├── 📁 pipefy/               # Cliente Pipefy  
│   │   │   ├── __init__.py  
│   │   │   └── pipefy_client.py     # Cliente GraphQL do Pipefy  
│   │   ├── 📁 storage/              # Armazenamento de dados  
│   │   │   ├── __init__.py  
│   │   │   └── people_repository.py # Implementação com JSON  
│   │   ├── 📁 http/                 # Cliente HTTP base  
│   │   │   ├── __init__.py  
│   │   │   └── http_client.py       # Cliente HTTP com retry  
│   │   └── __init__.py  
│   │  
│   ├── 📁 presentation/             # Camada de Apresentação (interface)  
│   │   ├── 📁 commands/             # Comandos do bot  
│   │   │   ├── __init__.py  
│   │   │   ├── base_command.py      # Classe base de comando  
│   │   │   ├── help_command.py      # Comando /help  
│   │   │   ├── get_msgs_command.py  # Comando /get_msgs  
│   │   │   ├── send_msg_command.py  # Comando /send_msg  
│   │   │   └── command_factory.py   # Factory de comandos  
│   │   ├── 📁 handlers/             # Handlers de mensagens  
│   │   │   ├── __init__.py  
│   │   │   └── message_handler.py   # Handler principal  
│   │   ├── 📁 webhooks/             # Endpoints de webhook  
│   │   │   ├── __init__.py  
│   │   │   └── whatsapp_webhook.py  # Webhook do WhatsApp  
│   │   └── __init__.py  
│   │  
│   ├── 📁 shared/                   # Código compartilhado  
│   │   ├── 📁 errors/               # Erros customizados  
│   │   │   ├── __init__.py  
│   │   │   └── exceptions.py        # Classes de exceção  
│   │   ├── 📁 validators/           # Validadores  
│   │   │   ├── __init__.py  
│   │   │   └── schemas.py           # Schemas de validação (Pydantic)  
│   │   ├── 📁 utils/                # Utilitários  
│   │   │   ├── __init__.py  
│   │   │   └── helpers.py           # Funções auxiliares  
│   │   ├── __init__.py  
│   │   ├── logger.py                # Configuração de logs  
│   │   └── config.py                # Configurações da aplicação  
│   │  
│   ├── __init__.py  
│   └── main.py                      # Ponto de entrada da aplicação  
│  
├── 📁 data/                         # Dados persistentes  
│   └── people_info.json             # Arquivo de pessoas  
│  
├── 📁 logs/                         # Arquivos de log  
│   └── .gitkeep  
│  
├── 📁 tests/                        # Testes  
│   ├── 📁 unit/                     # Testes unitários  
│   ├── 📁 integration/              # Testes de integração  
│   └── __init__.py  
│  
├── .env.example                     # Exemplo de variáveis de ambiente  
├── .env                             # Variáveis de ambiente (não commitado)  
├── .gitignore                       # Arquivos ignorados pelo Git  
├── requirements.txt                 # Dependências do projeto  
├── pyproject.toml                   # Configuração do projeto Python  
└── README.md                        # Documentação  

Collecting workspace information# Explicação da Estrutura de Pastas

## 📁 src/
Contém todo o código fonte da aplicação, organizado em camadas.

---

### 📁 domain/ (Camada de Domínio)
Coração do sistema - contém regras de negócio puras, sem dependências externas.

- **📁 entities/** - Classes que representam os objetos principais do sistema:
  - `person.py` - Representa uma pessoa (cliente, membro, diretor, etc.)
  - `message.py` - Representa uma mensagem trocada no WhatsApp
  - `pipefy_card.py` - Representa um card do Pipefy

- **📁 enums/** - Valores constantes e categorizados:
  - `role.py` - Tipos de papéis (Administrador, Diretor, Membro, Cliente)
  - `entity.py` - Diretorias (Comercial, Administrativo, Financeiro)
  - `fase_pipefy.py` - Fases do pipeline no Pipefy

- **📁 interfaces/** - Contratos abstratos que definem o que os serviços devem fazer (sem implementação):
  - `people_repository.py` - Define operações de leitura/escrita de pessoas
  - `whatsapp_service.py` - Define operações do WhatsApp
  - `pipefy_service.py` - Define operações do Pipefy

---

### 📁 application/ (Camada de Aplicação)
Orquestra as regras de negócio e coordena o fluxo de dados.

- **📁 use_cases/** - Cada arquivo representa uma ação específica do sistema:
  - `send_message.py` - Lógica para enviar mensagem
  - `get_messages.py` - Lógica para obter mensagens
  - `move_card.py` - Lógica para mover card no Pipefy

- **📁 services/** - Serviços auxiliares da aplicação:
  - `authorization.py` - Verifica se usuário pode executar determinado comando
  - `routing.py` - Decide para qual membro de Comercial encaminhar o cliente

- **📁 dtos/** - Objetos simples para transferir dados entre camadas:
  - `dtos.py` - Classes que estruturam dados de entrada/saída

---

### 📁 infrastructure/ (Camada de Infraestrutura)
Implementações concretas que se comunicam com serviços externos.

- **📁 whatsapp/** - Integração com WhatsApp:
  - `meta_whatsapp.py` - Implementação usando a API da Meta

- **📁 pipefy/** - Integração com Pipefy:
  - `pipefy_client.py` - Cliente que faz requisições GraphQL ao Pipefy

- **📁 storage/** - Persistência de dados:
  - `people_repository.py` - Lê/escreve no arquivo `people_info.json`

- **📁 http/** - Utilitários de comunicação HTTP:
  - `http_client.py` - Cliente HTTP com retry automático em caso de falhas

---

### 📁 presentation/ (Camada de Apresentação)
Interface do sistema com o mundo externo (entrada de dados).

- **📁 commands/** - Implementação dos comandos do bot:
  - `base_command.py` - Classe base que todos os comandos herdam
  - `help_command.py` - Implementa `/help`
  - `get_msgs_command.py` - Implementa `/get_msgs`
  - `send_msg_command.py` - Implementa `/send_msg`
  - `command_factory.py` - Cria o comando correto baseado no texto recebido

- **📁 handlers/** - Processadores de mensagens:
  - `message_handler.py` - Recebe mensagem e decide o que fazer (comando ou redirecionamento)

- **📁 webhooks/** - Endpoints que recebem dados externos:
  - `whatsapp_webhook.py` - Recebe notificações da API do WhatsApp

---

### 📁 shared/ (Código Compartilhado)
Utilitários e configurações usados por todas as camadas.

- **📁 errors/** - Exceções personalizadas:
  - `exceptions.py` - Classes de erro específicas (ex: `UnauthorizedError`)

- **📁 validators/** - Validação de dados:
  - `schemas.py` - Define formato esperado dos dados usando Pydantic

- **📁 utils/** - Funções auxiliares:
  - `helpers.py` - Funções genéricas (formatação de telefone, etc.)

- `logger.py` - Configuração centralizada de logs
- `config.py` - Carrega variáveis de ambiente e configurações

---

### `main.py`
Ponto de entrada - inicializa e conecta todas as camadas.

---

## 📁 data/
Armazena dados persistentes.
- `people_info.json` - Cadastro de pessoas e suas permissões

## 📁 logs/
Arquivos de log gerados pela aplicação.

## 📁 tests/
Testes automatizados.
- **📁 unit/** - Testes de unidades isoladas
- **📁 integration/** - Testes de integração entre componentes

## Arquivos raiz
- `.env` / `.env.example` - Variáveis de ambiente (tokens, chaves de API)
- `requirements.txt` - Dependências Python
- `pyproject.toml` - Configuração do projeto Python
- `.gitignore` - Arquivos ignorados pelo Git