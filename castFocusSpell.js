
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


    let iFocusV = actor.system.resources.focus.value;
    
    let fSpell = canvas.tokens.controlled[0].actor.spellcasting.collections.contents[1].contents.find(SpellPF2e => SpellPF2e.name == "Thunderous Strike");//change name for new spell
    let fSpellCost = fSpell.system.cast.focusPoints;
    
    if(iFocusV < fSpellCost){
        ui.notifications.warn("Not enough Focus Points.");
        return;
    }

    actor.update({"system.resources.focus.value": iFocusV-fSpellCost});

    game.pf2e.rollItemMacro("YlyIppeQesH9RQmb");//change to new macro

}


canvas.tokens.controlled[0].actor.system.spellcasting.collections[0].value.system.cast
let fSpell = canvas.tokens.controlled[0].actor.spellcasting.collections.contents[1].contents.find(SpellPF2e => SpellPF2e.name == "Thunderous Strike");//change name for new spell
let fSpellCost = fSpell.system.cast.focusPoints;