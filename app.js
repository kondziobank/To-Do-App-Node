const parseArgs = require('minimist');
const colors = require('colors');
const fs = require('fs');

const command = parseArgs(process.argv.slice(2, 3));
delete command._
console.log(command);

const handleCommand = ({add, remove, list}) => {
    if(add) {
        if(typeof add !== "string") {
            return console.log("Wpisz nazwę dodawanego zadania (tekst!!!)".red);
        } else if(add.length < 7) {
            return console.log("Nazwa zadania musi mieć więcej niż 6 znaków".red);
        }
        handleData(1, add);
    } else if(remove) {
        if(typeof remove !== "string" || remove.length < 7) {
            return console.log("Wpisz nazwę usuwanego zadania. To musi być tekst i musi mieć więcej niż 6 znaków".red);
        }
        handleData(2, remove);
    } else if (list || list === ""){
        handleData(3, null);
    } else {
        console.log('Nie rozumiem polecenia. Użyj --add="nazwa zadania", --remove="nazwa zadania" lub opcji --list');
    }
}

const handleData = (type, title) => {
    //type = number (1 - add; 2 - remove; 3 - list)
    const data = fs.readFileSync('data.json');
    const tasks = JSON.parse(data)
    console.log(tasks);

    if(type === 1 || type === 2) {
        isExisted = tasks.find(task => task.title === title) ? true : false;
        if(type === 1 && isExisted) {
            return console.log("Takie zadanie już istnieje");
        } else if (type === 2 && !isExisted) {
            return console.log("Nie można usunąć zadania które istnieje");
        }
    }

    
    switch (type) {
        case 1:
            const id = tasks.length + 1;
            tasks.push({id, title})
            const dataJSON = JSON.stringify(tasks);
            fs.writeFileSync('data.json', dataJSON);
            console.log(`dodaję zadanie: ${title}`.green);
            break;
        case 2:
            const index = tasks.findIndex(task => task.title === title)
            tasks.splice(index, 1);
            dataJSON = JSON.stringify(tasks)
            false.writeFile('data.json', dataJSON, 'utf8', (err) => {
                if (err) throw err;
                console.log(`Zadanie $title zostało usunięte`.green);
            })
            break;
        case 3:
            console.log("wyświetlam listę");
            break;
    }
}
handleCommand(command);