let currentKeys = [];

document.addEventListener('keydown', (event) => {

    let name = event.key
    let exists = false;
    currentKeys.forEach(keyName => {
        if(name == keyName) exists = true;
    });
    if(!exists) currentKeys.push(name);
});

document.addEventListener('keyup', (event) => {
    
    let name = event.key;
    let keysToRemove = [];
    for(let i = 0; i < currentKeys.length; i++)
    {
        if(name == currentKeys[i]) keysToRemove.push(i);
    }

    keysToRemove.forEach(index => {
        currentKeys.splice(index, 1);
    });
})