main()

async function main(){

    if (canvas.tokens.controlled.length !== 1) {
        ui.notifications.warn("Please select exactly one token.");
        return;
    }
    const actorS = canvas.tokens.controlled[0].actor;

    if (!actorS) {
        ui.notifications.warn("No actor found for the selected token.");
        return;
    }


    function checkBomb(item) {
        return item.system.group == "bomb";
    }
    let optionsFull = actorS.inventory.filter(checkBomb);

    var myContent = `
            <div class="form-group">
            <label for="exampleSelect">what Bomb? : </label>
            <select name="exampleSelect">`

    for (i = 0; i < optionsFull.length; i++){
        let name = optionsFull[i].name;
        let img = optionsFull[i].img;
        const amount = optionsFull[i].system.quantity;
        if(optionsFull[i].system.temporary == true){
            myContent += `
                    <option value="${name}">  Daily :  ${name} : ${amount}</option>`
        }else{
            myContent += `
                    <option value="${name}">  ${name} : ${amount}</option>`
        }

    };

    myContent += `
            </select>
            </div>`

    await Dialog.prompt({
        title: 'Bomb select',

        content: myContent,
                
        callback: async(html) => {
            let select = html.find('[name="exampleSelect"]').val();   
            const bomb = actorS.inventory.find(WeaponPF2e =>  WeaponPF2e.name == select);
            await bomb.update({"system.equipped.carryType": "held"});
            await bomb.update({"system.equipped.handsHeld": 1});
            game.pf2e.rollActionMacro({ actorUUID: "Actor." + actorS.id,  type: "strike", itemId: bomb.id, slug: bomb.system.slug});
        }
    })

}