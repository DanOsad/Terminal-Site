/* Interactive functionality */

class Command {
    constructor ( name, content ) {
        this.name = name
        this.content = content
    }
    output() {
        // todo
    }
    insertDOM(text) {
        document.querySelector('#terminal-window').innerText = text
    }
}

class About extends Command {
    constructor ( name, content ) {
        super(name)
        super(content)
    }
}
class Projects extends Command {
    constructor ( name, content ) {
        super(name)
        super(content)
    }
}
class Contact extends Command {
    constructor ( name, content ) {
        super(name)
        super(content)
    }
}
class Clear extends Command {
    constructor ( name, content ) {
        super(name)
        super(content)
    }
}
class Help extends Command {
    constructor ( name, content ) {
        super(name)
        super(content)
    }
}

let commands = ['about', 'projects', 'contact', 'clear', 'help']

function input( userInput ) {
    let input = userInput.toLowerCase()
    switch ( commands.includes(input) ) {
        case userInput == 'about':
            return new About(name, content) //init new object of that class
            break
        case userInput == 'projects':
            return new Projects(name, content) //init new object of that class
            break
        case userInput == 'contact':
            return new Contact(name, content) //init new object of that class
            break
        case userInput == 'clear':
            return new Clear(name, content) //init new object of that class
            break
        case userInput == 'help':
            return new Help(name, content) //init new object of that class
            break
    } 
}

const newTerminalLine = () => {
    let div = document.createElement('div')
    div.setAttribute('class', 'terminalLine')
    div.innerHTML = `
                    <div class="terminalLine">
                        <p class="userName">user</p>
                        <p class="at">@</p>
                        <p class="address">term.osadtsuk.com</p>
                        <p class="sudo">:$ ~</p>
                        <input type="text" name="terminalInput" autofocus>
                    </div>
                    `
    document.getElementById('terminal-window').appendChild(div)
}

document.querySelector('#button').addEventListener('click', newTerminalLine)

// function for listening for enter key press
window.addEventListener("keydown", function(event) {
    if ( event.code === 'Enter' ) {
        console.log('Enter key pressed...')
        replaceLine()
        newTerminalLine()
    }
})

// make previous terminal lines non-interactive
function replaceLine() {
    // get whats written in input
    let text = document.querySelector('input').value
    console.log(text)
    // replace line with text-only version
}

