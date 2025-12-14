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

As funções das entidades no sistema estão definidas abaixo:

### Whatsapp
- Redirecionar mensagens dos clientes para os membros de Comercial automaticamente
- Redirecionar mensagens dos membros de Comercial para os clientes
- Decidir automaticamente para qual membro de Comercial o cliente será redirecionado com base na quantidade de cards que cada membro de Comercial possui na fase de Comercial
- Adicionar e alterar informações dos novos leads para a database no Pipefy
- Adicionar e mover novos cards que representam leads ao pipe de Comercial
- Executar funções internas com /command, alguns exemplos são:   

  > **/get_msgs [num_telefone_cliente]**  
  Se o comando for rodado sem argumentos, expõe uma lista clicável de números de telefone relacionados ao membro de Comercial que rodar o comando. Pode ser rodado por quaisquer membros de Financeiro, Comercial ou Administrativo para conseguir um contexto melhor para o caso de alguma dúvida.  
  
  > **/get_all_cards**  
  Obtém todas as informações de todos os cards relacionados aos leads ativos no Pipefy.   

  > **/get_card [num_telefone_cliente]**  
  Se o comando for rodado sem argumentos, expõe uma lista clicável de números de telefone de todos os cards  
  relacionados aos leads 