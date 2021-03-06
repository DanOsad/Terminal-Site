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

// const oldTerminalLine = () => {
//     let div = document.createElement('div')
//     div.setAttribute('class', 'terminalLine')
//     div.innerHTML = `
//                     <p class="userName">user</p>
//                     <p class="at">@</p>
//                     <p class="address">term.osadtsuk.com</p>
//                     <p class="sudo">:$ ~</p>
//                     <input type="text" name="terminalInput" autofocus>
//                     `
//     document.getElementById('terminal-window').appendChild(div)
// }

// function for listening for enter key press
window.addEventListener("keydown", function(event) {
    if ( event.code === 'Enter' ){ //&& document.querySelector('input').value !== '' ) {
        console.log('Enter key pressed...')
        inputList()
        replaceLine()
        // typeWriter()
        respond()
        newTerminalLine()
        changeInputColor()
    }
})

/* MAKE OLD LINES INACTIVE */
function replaceLine() {
    // get whats written in input
    let text = document.querySelector('input').value
    // replace line with text-only version
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

/* TYPING EFFECT */
const line = 'Lorem ipsum typing effect!'; /* The text */
let i = 0
let speed = 50 /* The speed/duration of the effect in milliseconds */

function typeWriter() {
    
    if (i < line.length) {
        document.getElementById("content").innerHTML += line.charAt(i)
        i++
        setTimeout(typeWriter, speed)
    }
}

/* CHANGE INPUT COLOR */
function changeInputColor(){
    const input = document.getElementById('input')
    input.addEventListener('input', event => {
        if (input.value === 'help') {
            input.style.color = 'red'
        } else {
            input.style.color = ''
        }
    })
}

/* SAVE INPUTS TO LIST */
let commanded = []
function inputList() {
    let input = document.getElementById('input').value
    commanded.push(input)
    // console.log(commanded)
}

/* COMMAND NOT FOUND */
function commandNotFound() {
    let div = document.createElement('div')
    div.setAttribute('class', 'responseLine')
    div.innerHTML = '<p>Command not found. For a list of commands, type <span class="help">help</span></p>'
    document.getElementById('terminal-window').appendChild(div)
}

/* RESPONDS TO HELP ONLY (FOR NOW) */
function respond() {
    let input = commanded[commanded.length-1]
    console.log(input)
    if (input !== 'help') {
        commandNotFound()
    } 
}