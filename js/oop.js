class Command {
    constructor () {
        this.commands = ['about', 'projects', 'contact', 'clear', 'help', 'date']
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
        } else {
            this.commandNotFound()
        }
    }
    commandNotFound() {
        let div = document.createElement('div')
        div.setAttribute('class', 'responseLine')
        div.innerHTML = '<p>Command not found. For a list of commands, type <span class="glow">help</span></p>'
        document.getElementById('terminal-window').appendChild(div)
    }
    help() {
        for (let command of this.commands) {
            let div = document.createElement('div')
            div.setAttribute('class', 'responseLine')
            div.innerHTML = `<p><span class="glow">${command}</span></p>`
            document.getElementById('terminal-window').appendChild(div)
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
            let div = document.createElement('div')
            div.setAttribute('class', 'responseLine')
            div.innerHTML = `<p>${project}&nbsp;<a href="${projects[project]}"><span class="glow">on github</span></a></p>`
            document.getElementById('terminal-window').appendChild(div)
        }
    }
    contact() {
        let div = document.createElement('div')
        div.setAttribute('class', 'responseLine')
        div.innerHTML = `<p><a href="mailto:dan@osadtsuk.com"><span class="glow">email me</span></a></p>`
        document.getElementById('terminal-window').appendChild(div)
    }
    about() {
        const about = [
            "<p>i'm Dan Osadtsuk, a full stack developer based in Tel Aviv</p>",
            "<p>building useful products and tools is my passion</p>",
            "<p>in my spare time, my dog and i climb, camp, cycle, and swim together</p>",
            '<p>check me out on <a href="https://github.com/DanOsad/"><span class="glow">github</span></a></p>',
        ]
        for (let line of about) {
            let div = document.createElement('div')
            div.setAttribute('class', 'responseLine')
            div.innerHTML = line
            document.getElementById('terminal-window').appendChild(div)
        }
    }
    date() {
        let date = new Date()
        let div = document.createElement('div')
        div.setAttribute('class', 'responseLine')
        div.innerHTML = `<p>${date}</p>`
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