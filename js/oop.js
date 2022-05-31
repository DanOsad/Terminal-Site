class Command {
    constructor () {
        this.commands = ['about', 'projects', 'contact', 'clear', 'help']
        this.pastCommands = []
    }
    begin() {
        this.newTerminalLine()
    }
    output() {
        // todo
    }
    insertDOM(text) {
        document.querySelector('#terminal-window').innerText = text
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
    commandNotFound() {
        let div = document.createElement('div')
        div.setAttribute('class', 'responseLine')
        div.innerHTML = '<p>Command not found. For a list of commands, type <span class="help">help</span></p>'
        document.getElementById('terminal-window').appendChild(div)
    }
    respond() {
        let input = this.pastCommands[this.pastCommands.length-1]
        if (input !== 'help') {
            this.commandNotFound()
        } 
    }
}

window.addEventListener("keydown", function(event) {
    let line = new Command()
    line.begin()
    line.changeInputColor()
    if (event.code === 'Enter') {
        let line = new Command()
        line.pushCommandToInputList()
        line.replaceLine()
        // inputList()
        // replaceLine()
        // typeWriter()
        // respond()
        // newTerminalLine()
    }
})