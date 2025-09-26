const {
    default: makeWASocket,
    DisconnectReason,
    useMultiFileAuthState,
    isJidGroup,
    jidDecode
} = require('@whiskeysockets/baileys')
const qrcode = require('qrcode-terminal')
const cron = require('node-cron')
const P = require('pino')

// Logger configurado para reduzir verbosidade
const logger = P({ level: 'silent' })

class WABot {
    constructor() {
        this.sock = null
        this.qr = undefined
        this.scheduledMessages = []
    }

    async start() {
        try {
            console.log('🚀 Iniciando WABot...')
            await this.connect()
        } catch (error) {
            console.error('❌ Erro ao iniciar o bot:', error)
        }
    }

    async connect() {
        try {
            // Usa autenticação multi-arquivo para salvar a sessão
            const { state, saveCreds } = await useMultiFileAuthState('auth_info')
            
            this.sock = makeWASocket({
                auth: state,
                printQRInTerminal: false, // Desabilitamos para usar nossa própria implementação
                logger,
                browser: ['WABot', 'Chrome', '1.0.0'],
                generateHighQualityLinkPreview: true
            })

            // Event listeners
            this.sock.ev.on('connection.update', (update) => {
                const { connection, lastDisconnect, qr } = update
                
                if (qr) {
                    this.qr = qr
                    console.log('\n📱 Escaneie o QR Code abaixo com o WhatsApp:')
                    qrcode.generate(qr, { small: true })
                }
                
                if (connection === 'close') {
                    const shouldReconnect = (lastDisconnect?.error)?.output?.statusCode !== DisconnectReason.loggedOut
                    console.log('🔌 Conexão fechada devido a:', lastDisconnect?.error, ', reconectando:', shouldReconnect)
                    
                    if (shouldReconnect) {
                        setTimeout(() => this.connect(), 3000)
                    }
                } else if (connection === 'open') {
                    console.log('✅ Conectado ao WhatsApp com sucesso!')
                    this.startScheduledMessages()
                }
            })

            this.sock.ev.on('creds.update', saveCreds)
            
            // Event listener para mensagens recebidas (opcional)
            this.sock.ev.on('messages.upsert', async (m) => {
                const message = m.messages[0]
                if (!message.key.fromMe && m.type === 'notify') {
                    await this.handleIncomingMessage(message)
                }
            })

        } catch (error) {
            console.error('❌ Erro na conexão:', error)
            setTimeout(() => this.connect(), 5000)
        }
    }

    async handleIncomingMessage(message) {
        try {
            const messageContent = message.message?.conversation || 
                                 message.message?.extendedTextMessage?.text || ''
            
            // Exemplo de resposta automática para comandos específicos
            if (messageContent.toLowerCase() === '!status') {
                await this.sendMessage(message.key.remoteJid, '🤖 Bot está funcionando!')
            }
        } catch (error) {
            console.error('❌ Erro ao processar mensagem:', error)
        }
    }

    async sendMessage(jid, message) {
        try {
            if (!this.sock) {
                console.log('❌ Socket não está conectado')
                return false
            }

            await this.sock.sendMessage(jid, { text: message })
            console.log(`✅ Mensagem enviada para ${jid}: ${message}`)
            return true
        } catch (error) {
            console.error('❌ Erro ao enviar mensagem:', error)
            return false
        }
    }

    async getGroups() {
        try {
            if (!this.sock) {
                console.log('❌ Socket não está conectado')
                return []
            }

            const groups = await this.sock.groupFetchAllParticipating()
            const groupList = Object.values(groups).map(group => ({
                id: group.id,
                name: group.subject,
                participants: group.participants.length
            }))
            
            console.log('📋 Grupos disponíveis:')
            groupList.forEach((group, index) => {
                console.log(`${index + 1}. ${group.name} (${group.participants} membros) - ID: ${group.id}`)
            })
            
            return groupList
        } catch (error) {
            console.error('❌ Erro ao buscar grupos:', error)
            return []
        }
    }

    scheduleMessage(groupId, message, cronExpression) {
        try {
            const task = cron.schedule(cronExpression, async () => {
                console.log(`⏰ Enviando mensagem agendada para ${groupId}`)
                await this.sendMessage(groupId, message)
            }, {
                scheduled: false,
                timezone: "America/Sao_Paulo"
            })

            this.scheduledMessages.push({
                groupId,
                message,
                cronExpression,
                task
            })

            console.log(`📅 Mensagem agendada criada para ${groupId} com expressão cron: ${cronExpression}`)
            return task
        } catch (error) {
            console.error('❌ Erro ao agendar mensagem:', error)
            return null
        }
    }

    startScheduledMessages() {
        console.log('⏰ Iniciando tarefas agendadas...')
        this.scheduledMessages.forEach(scheduled => {
            if (scheduled.task) {
                scheduled.task.start()
                console.log(`✅ Tarefa iniciada para ${scheduled.groupId}`)
            }
        })
    }

    stopScheduledMessages() {
        console.log('⏹️ Parando todas as tarefas agendadas...')
        this.scheduledMessages.forEach(scheduled => {
            if (scheduled.task) {
                scheduled.task.stop()
            }
        })
    }

    listScheduledMessages() {
        console.log('📋 Mensagens agendadas:')
        this.scheduledMessages.forEach((scheduled, index) => {
            console.log(`${index + 1}. Grupo: ${scheduled.groupId}`)
            console.log(`   Mensagem: ${scheduled.message}`)
            console.log(`   Cron: ${scheduled.cronExpression}`)
            console.log(`   Status: ${scheduled.task.getStatus()}`)
            console.log('---')
        })
    }
}

// Exemplo de uso
const bot = new WABot()

// Função para configurar mensagens agendadas
function setupScheduledMessages() {
    // Exemplo: Mensagem todo dia às 9:00
    // bot.scheduleMessage('GRUPO_ID_AQUI@g.us', 'Bom dia pessoal! 🌅', '0 9 * * *')
    
    // Exemplo: Mensagem de segunda a sexta às 18:00
    // bot.scheduleMessage('GRUPO_ID_AQUI@g.us', 'Fim do expediente! 🏁', '0 18 * * 1-5')
    
    // Exemplo: Mensagem a cada 30 minutos
    // bot.scheduleMessage('GRUPO_ID_AQUI@g.us', 'Mensagem periódica', '*/30 * * * *')
}

// Interface de linha de comando simples
function showMenu() {
    console.log('\n📋 Menu de Opções:')
    console.log('1. Listar grupos')
    console.log('2. Enviar mensagem agora')
    console.log('3. Agendar mensagem')
    console.log('4. Listar mensagens agendadas')
    console.log('5. Parar mensagens agendadas')
    console.log('6. Sair')
}

// Inicia o bot
bot.start().then(() => {
    // Configurar mensagens agendadas aqui
    setupScheduledMessages()
    
    // Exemplo de interface simples para teste
    const readline = require('readline')
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    setTimeout(() => {
        showMenu()
        
        rl.on('line', async (input) => {
            const option = input.trim()
            
            switch (option) {
                case '1':
                    await bot.getGroups()
                    break
                case '2':
                    rl.question('Digite o ID do grupo: ', (groupId) => {
                        rl.question('Digite a mensagem: ', async (message) => {
                            await bot.sendMessage(groupId, message)
                            showMenu()
                        })
                    })
                    return
                case '3':
                    rl.question('Digite o ID do grupo: ', (groupId) => {
                        rl.question('Digite a mensagem: ', (message) => {
                            rl.question('Digite a expressão cron (ex: 0 9 * * *): ', (cron) => {
                                bot.scheduleMessage(groupId, message, cron)
                                showMenu()
                            })
                        })
                    })
                    return
                case '4':
                    bot.listScheduledMessages()
                    break
                case '5':
                    bot.stopScheduledMessages()
                    break
                case '6':
                    console.log('👋 Encerrando o bot...')
                    process.exit(0)
                    break
                default:
                    console.log('❌ Opção inválida')
            }
            
            showMenu()
        })
    }, 2000)
})

module.exports = WABot