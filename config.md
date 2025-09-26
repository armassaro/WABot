# Configuração do WABot

Este arquivo contém exemplos de configuração para o WABot.

## IDs de Grupos

Para obter o ID de um grupo:
1. Execute o bot
2. Use a opção "1" para listar grupos
3. Copie o ID do grupo desejado

Exemplo de ID de grupo: `120363041234567890@g.us`

## Expressões Cron

O bot usa expressões cron para agendar mensagens. Formato:
```
* * * * *
│ │ │ │ │
│ │ │ │ └─── Dia da semana (0-7, onde 0 e 7 = domingo)
│ │ │ └───── Mês (1-12)
│ │ └─────── Dia do mês (1-31)
│ └───────── Hora (0-23)
└─────────── Minuto (0-59)
```

### Exemplos de expressões cron:

- `0 9 * * *` - Todo dia às 9:00
- `0 18 * * 1-5` - Segunda a sexta às 18:00
- `*/30 * * * *` - A cada 30 minutos
- `0 12 * * 0` - Todo domingo ao meio-dia
- `0 8,12,18 * * *` - Às 8h, 12h e 18h todos os dias
- `0 9 1 * *` - Todo dia 1 de cada mês às 9h

## Configuração de Mensagens Agendadas

Edite a função `setupScheduledMessages()` no arquivo `index.js` para configurar suas mensagens:

```javascript
function setupScheduledMessages() {
    // Mensagem de bom dia
    bot.scheduleMessage(
        'SEU_GRUPO_ID@g.us', 
        'Bom dia, pessoal! 🌅 Que todos tenham um excelente dia!', 
        '0 8 * * 1-5'
    )
    
    // Lembrete de almoço
    bot.scheduleMessage(
        'SEU_GRUPO_ID@g.us', 
        'Hora do almoço! 🍽️', 
        '0 12 * * 1-5'
    )
    
    // Mensagem de final de expediente
    bot.scheduleMessage(
        'SEU_GRUPO_ID@g.us', 
        'Fim do expediente! Tenham um ótimo final de tarde! 🏁', 
        '0 18 * * 1-5'
    )
}
```

## Fuso Horário

O bot está configurado para usar o fuso horário `America/Sao_Paulo`. 
Para alterar, modifique a propriedade `timezone` na função `scheduleMessage`.