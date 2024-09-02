main()

async function main(){
    if (canvas.tokens.controlled.length !== 1) {
        ui.notifications.warn("Please select exactly one token.");
        return;
    }

    let actor = canvas.tokens.controlled[0].actor;
    if (!actor) {
        ui.notifications.warn("No actor found for the selected token.");
        return;
    }


    let iReagentsV = actor.system.resources.crafting.infusedReagents.value;
    if(iReagentsV < 1){
        ui.notifications.warn("Not enough Infused Reagents.");
        return;
    }


    let newiReagentsV = iReagentsV - 1;
    actor.update({"system.resources.crafting.infusedReagents.value": newiReagentsV});


    let newAmmo = actor.inventory.find(ConsumablePF2e => ConsumablePF2e.name == "Elemental Ammunition (Lesser)[Electricity]");//inset name you whant to find
    
    if(newAmmo == null || newAmmo == undefined){
        ui.notifications.warn("No item found for the Name.");
        return;
    }

    newAmmo.update({"system.quantity": newAmmo.system.quantity + 2});

    ui.notifications.info("Amunition Crafted successfully.");
}


//canvas.tokens.controlled[0].actor.system.resources.crafting.infusedReagents.value
//canvas.tokens.controlled[0].actor.inventory
