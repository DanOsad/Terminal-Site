class Command {
    constructor () {
        this.commands = [
            'about', 
            'projects', 
            'contact', 
            'date',
            'echo',
            'help', 
            'clear', 
        ]
        this.pastCommands = []
    }
    begin() {
        this.newTerminalLine()
    }
    replaceLine() {
        let text = document.querySelector('input').value
        let oldLine = document.querySelector('.terminalLine')
        oldLine.remove()
        let div = document.createElement('div')
        div.setAttribute('class', 'oldTerminalLine')
        div.innerHTML = `
                        <p class="userName">user</p>
                        <p class="at">@</p>
                        <p class="address">term.osadtsuk.com</p>
                        <p class="sudo">:$ ~</p>
                        <p class="oldInput">${text}</p>
                        `
        document.getElementById('terminal-window').appendChild(div)
    }
    pushCommandToInputList() {
        let input = document.getElementById('input').value
        this.pastCommands.push(input)
    }
    newTerminalLine() {
        let div = document.createElement('div')
        div.setAttribute('id', 'terminalLine')
        div.setAttribute('class', 'terminalLine')
        div.innerHTML = `
                            <p class="userName">user</p>
                            <p class="at">@</p>
                            <p class="address">term.osadtsuk.com</p>
                            <p class="sudo">:$ ~</p>
                            <input type="text" name="terminalInput" id="input" autofocus>
                        `
        document.getElementById('terminal-window').appendChild(div)
        document.querySelector('#input').focus()
    }
    changeInputColor() {
        const input = document.getElementById('input')
        input.addEventListener('input', event => {
            if (this.commands.includes(input.value.toLowerCase())) {
                input.style.color = 'var(--light-red)'
            } else {
                input.style.color = ''
            }
        })
    }
    respond() {
        let input = this.pastCommands[this.pastCommands.length-1].toLowerCase()
        if (input == 'clear') {
            this.clear()
        } else if (input == 'projects') {
            this.projects()
        } else if (input == 'help') {
            this.help()
        } else if (input == 'contact') {
            this.contact()
        } else if (input == 'about') {
            this.about()
        } else if (input == 'date') {
            this.date()
        } else if (input.split(' ')[0] == 'echo') {
            this.echo()
        } else {
            this.commandNotFound()
        }
    }
    commandNotFound() {
        this.buildResponseLine('Command not found. For a list of commands, type <span class="glow">help</span>')
    }
    help() {
        for (let command of this.commands) {
            this.buildResponseLine(`<span class="glow">${command}</span>`)
        }
    }
    clear() {
        let parentId = 'terminal-window'
        let childName = 'oldTerminalLine'
        let secondChildName = 'responseLine'
        let childNodesToRemove = document.getElementById(parentId).getElementsByClassName(childName)
        for(let i=childNodesToRemove.length-1; i >= 0; i--){
            let childNode = childNodesToRemove[i]
            childNode.parentNode.removeChild(childNode)
        }
        let secondChildNodesToRemove = document.getElementById(parentId).getElementsByClassName(secondChildName)
        for(let i=secondChildNodesToRemove.length-1; i >= 0; i--){
            let childNode = secondChildNodesToRemove[i]
            childNode.parentNode.removeChild(childNode)
        }
    }
    projects() {
        const projects = {
            "tictactoe oop" : "https://github.com/DanOsad/TicTacToe",
            "quote generator" : "https://github.com/DanOsad/Quote",
            "bash site oop" : "https://github.com/DanOsad/Terminal-Site",
            "localstorage crud" : "https://github.com/DanOsad/LocalUser",
        }
        for (const project in projects) {
            this.buildResponseLine(`${project}&nbsp;<a href="${projects[project]}"><span class="glow">on github</span></a>`)
        }
    }
    contact() {
        this.buildResponseLine('<a href="mailto:dan@osadtsuk.com"><span class="glow">email me</span></a>')
    }
    about() {
        const about = [
            "i'm Dan Osadtsuk, a full stack developer based in Tel Aviv",
            "building useful products and tools is my passion",
            "in my spare time, my dog and i climb, camp, cycle, and swim together",
            'check me out on <a href="https://github.com/DanOsad/"><span class="glow">github</span></a>',
        ]
        for (let line of about) {
            this.buildResponseLine(`${line}`)
        }
    }
    date() {
        let date = new Date()
        this.buildResponseLine(date)
    }
    echo() {
        let input = this.pastCommands[this.pastCommands.length-1].split('echo')[1]
        if (input !== 'undefined') {
            this.buildResponseLine(input)
        }
    }
    buildResponseLine(html) {
        let div = document.createElement('div')
        div.setAttribute('class', 'responseLine')
        div.innerHTML = `<p>${html}</p>`
        document.getElementById('terminal-window').appendChild(div)
    }
}

const runApp = () => {
    let line = new Command()
    line.begin()
    window.addEventListener("keydown", function(event) {
        line.changeInputColor()
        if (event.code === 'Enter') {
            line.pushCommandToInputList()
            line.replaceLine()
            // typeWriter()
            line.respond()
            line.newTerminalLine()
        }
    })
}

runApp()