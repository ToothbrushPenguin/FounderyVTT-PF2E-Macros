// Simplified PF2e Spellstrike Macro
async function spellstrikeMacro() {
    if (canvas.tokens.controlled.length !== 1) {
        ui.notifications.warn("Please select exactly one token.");
        return;
    }
    const actor = canvas.tokens.controlled[0].actor;

    if (!actor) {
        ui.notifications.warn("No actor found for the selected token.");
        return;
    }

    // Get prepared spells
    const preparedSpells = actor.itemTypes.spell.filter(spell => 
        spell.system.location?.value === "wDehJaU4z84nxGkz" && // Adjust this ID if needed
        spell.system.level.value > 0 &&
        !spell.system.traits.value.includes("cantrip")
    );

    // Get available weapons
    const availableWeapons = actor.itemTypes.weapon.filter(weapon => 
        weapon.system.equipped.carryType === "held" &&
        weapon.system.equipped.handsHeld > 0
    );

    if (preparedSpells.length === 0 || availableWeapons.length === 0) {
        ui.notifications.warn("No prepared spells or held weapons found.");
        return;
    }

    // Create dialog content
    let dialogContent = `
    <h2>Spellstrike</h2>
    <p>Choose a spell and a weapon for your Spellstrike:</p>
    <div>
        <label for="spell-select">Spell:</label>
        <select id="spell-select">
            ${preparedSpells.map(spell => `<option value="${spell.id}">${spell.name} (Level ${spell.system.level.value})</option>`).join('')}
        </select>
    </div>
    <div>
        <label for="weapon-select">Weapon:</label>
        <select id="weapon-select">
            ${availableWeapons.map(weapon => `<option value="${weapon.id}">${weapon.name}</option>`).join('')}
        </select>
    </div>`;

    // Show dialog
    new Dialog({
        title: "Spellstrike",
        content: dialogContent,
        buttons: {
            strike: {
                label: "Spellstrike!",
                callback: async (html) => {
                    const spellId = html.find('#spell-select').val();
                    const weaponId = html.find('#weapon-select').val();
                    await performSpellstrike(actor, spellId, weaponId);
                }
            },
            cancel: {
                label: "Cancel"
            }
        }
    }).render(true);
}

async function performSpellstrike(actor, spellId, weaponId) {
    const spell = actor.items.get(spellId);
    const weapon = actor.items.get(weaponId);

    if (!spell || !weapon) {
        ui.notifications.error("Spell or weapon not found.");
        return;
    }

    const hWeapon = actor.inventory.find(WeaponPF2e => WeaponPF2e.id == weaponId);

    // Perform the strike
    await game.pf2e.rollActionMacro({ actorUUID: "Actor." + actor.id, type: "strike", itemId: hWeapon.id, slug: hWeapon.system.slug });

    // Cast the spell
    await spell.toMessage();

    // Check if the spell is a cantrip
    const isCantrip = spell.system.level.value === 0 || spell.system.traits.value.includes("cantrip");

    if (!isCantrip) {
        // Proceed with expending the spell slot for non-cantrips
        const spellcastingEntry = actor.items.find(item => item.type === "spellcastingEntry" && item.name === "Arcane Prepared Spells");

        if (spellcastingEntry) {
            const slotLevel = `slot${spell.system.level.value}`;
            
            if (spellcastingEntry.system.slots[slotLevel]) {
                const preparedSpellIndex = spellcastingEntry.system.slots[slotLevel].prepared.findIndex(s => s.id === spellId);
                
                if (preparedSpellIndex !== -1) {
                    const update = {
                        _id: spellcastingEntry.id,
                        [`system.slots.${slotLevel}.prepared.${preparedSpellIndex}.expended`]: true
                    };

                    await actor.updateEmbeddedDocuments("Item", [update]);
                }
            }
        }
    }
}


spellstrikeMacro();