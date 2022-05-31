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
}

