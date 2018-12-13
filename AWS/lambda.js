const Alexa = require('ask-sdk-core');

function ProcessBattle(sType)
{
    let extraInfo = '';

    if (sType === 'stalk')
        extraInfo = '<break time="300ms"/> One was added for stalk.';
    if (sType === 'bold')
        extraInfo = '<break time="300ms"/> Attack another in the same ocean for free if you passed.';

    let responseString = '';

    let diceRoll = Math.floor(Math.random() * 5) + 1;
    diceRoll = diceRoll +  Math.floor(Math.random() * 5) + 1;

    if (diceRoll === 1){
        responseString = `<speak> Your weapons misfire, and you only rolled a 1 
            <break time="300ms"/> <audio src='soundbank://soundlibrary/battle/amzn_sfx_battle_yells_men_01'/> ` + extraInfo + `
             </speak>`;
    }
    else if (diceRoll === 2){
        responseString = `<speak> Although you tried valliantly, you only rolled a ` + diceRoll + `
            <break time="300ms"/> <audio src='soundbank://soundlibrary/nature/amzn_sfx_thunder_rumble_01'/> ` + extraInfo + `
             </speak>`;
    }
    else if (diceRoll === 3){
        responseString = `<speak>  You tried your best, but the night masqueraded the other ship too well.  You rolled a ` + diceRoll + `
            <break time="300ms"/> <audio src='soundbank://soundlibrary/battle/amzn_sfx_army_march_clank_7x_01'/> ` + extraInfo + `
             </speak>`;
    }
    else if (diceRoll === 4){
        responseString = `<speak> You barely grazed the other ship.  You can see their crew running around in panic, but not much damage was done .  You rolled a ` + diceRoll + `
            <break time="300ms"/> <audio src='soundbank://soundlibrary/magic/amzn_sfx_magic_blast_1x_01'/> ` + extraInfo + `
             </speak>`;
    }
    else if (diceRoll === 5){
        responseString = `<speak> You knocked a hole in their port side hull.  They appear to still be ok, though.  You rolled a ` + diceRoll + `
            <break time="300ms"/> <audio src='soundbank://soundlibrary/nature/amzn_sfx_lightning_strike_02'/> ` + extraInfo + `
             </speak>`;
    }
    else if (diceRoll === 6){
        responseString = `<speak> Your weapons slam against their hull, causing some damage.  Will it be enough? You rolled a ` + diceRoll + `
            <break time="300ms"/> <audio src='soundbank://soundlibrary/magic/amzn_sfx_magic_blast_1x_01'/> ` + extraInfo + `
             </speak>`;
    }
    else if (diceRoll === 7){
        responseString = `<speak> Your weapons ring out in the dark sea, rolling a ` + diceRoll + `
            <break time="300ms"/> <audio src='soundbank://soundlibrary/nature/amzn_sfx_lightning_strike_02'/> ` + extraInfo + `
             </speak>`;
    }
    else if (diceRoll === 8){
        responseString = `<speak> With your weapons aimed, you make a direct hit into the ship's interior.  You rolled a ` + diceRoll + `
            <break time="300ms"/> <audio src='soundbank://soundlibrary/battle/amzn_sfx_army_march_small_8x_01'/> ` + extraInfo + `
             </speak>`;
    }
    else if (diceRoll === 9){
        responseString = `<speak> You strike into the heart of their ship.  Flames erupt, you can see explosions.  You rolled a ` + diceRoll + `
            <break time="300ms"/> <audio src='soundbank://soundlibrary/battle/amzn_sfx_army_march_clank_7x_01'/> ` + extraInfo + `
             </speak>`;
    }
    else if (diceRoll === 10){
        responseString = `<speak> Massive strike into their starboard side.  Pieces are falling from their ship.  You rolled a ` + diceRoll + `
            <break time="300ms"/> <audio src='soundbank://soundlibrary/battle/amzn_sfx_battle_yells_men_run_01'/> ` + extraInfo + `
             </speak>`;
    }
    else if (diceRoll === 11){
        responseString = `<speak> Direct hit with pure malice.  You rolled an impressive ` + diceRoll + `
            <break time="300ms"/> <audio src='soundbank://soundlibrary/battle/amzn_sfx_battle_group_clanks_01'/> ` + extraInfo + `
             </speak>`;
    }
    else if (diceRoll === 12){
        responseString = `<speak> A perfect roll of double sixes.  Totalling ` + diceRoll + `
            <break time="300ms"/> <audio src='soundbank://soundlibrary/battle/amzn_sfx_battle_yells_men_run_01'/> ` + extraInfo + `
             </speak>`;
    }

    return responseString;
}

const ActOneTwoThreeHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === 'ActOneTwoThree';
    },
    handle(handlerInput) {

        const attributesManager = handlerInput.attributesManager;
        const sessionAttributes = attributesManager.getSessionAttributes();
        const act = handlerInput.requestEnvelope.request.intent.slots.act.value;
        sessionAttributes.act = act;
        attributesManager.setSessionAttributes(sessionAttributes);

        let responseString = ` <speak> <audio src='soundbank://soundlibrary/nature/amzn_sfx_ocean_wave_1x_01'/>
        In Act one we'll be rolling two white dice for the placement phase.  Good luck on the mission! </speak>`
        const actNum = parseInt(act);

        if (actNum === 2) {
            responseString = ` <speak> One thirds done with your mission! 
            <break time="300ms"/>
            <audio src='soundbank://soundlibrary/nature/amzn_sfx_ocean_wave_surf_01'/>
            In Act two we'll be rolling two white dice and one black for the placement phase </speak>`
        }
        else if (actNum === 3) {
            responseString = ` <speak> You're almost there! 
            <break time="300ms"/>
            <audio src='soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_positive_response_02'/>
            In Act three we'll be rolling three white dice and one black for the placement phase </speak>`
        }

        return handlerInput.responseBuilder.speak(responseString)
            .withShouldEndSession(false).withSimpleCard(`ActOneTwoThree`, ``).getResponse();
    },
};

const ReachedFortyFourNoteHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === 'ReachedFortyFourNote';
    },
    async handle(handlerInput) {

        const attributesManager = handlerInput.attributesManager;
        const sessionAttributes = attributesManager.getSessionAttributes();
        const previousNote = sessionAttributes.note
        const note = handlerInput.requestEnvelope.request.intent.slots.note.value;
        sessionAttributes.note = note;
        attributesManager.setSessionAttributes(sessionAttributes);

        let noteNum = 0;
        let previousNoteNum = 0
        try {
            noteNum = parseInt(note);
            previousNoteNum = parseInt(previousNote);
        } catch (e) { }

        let responseString = `Ok, <break time="300ms"/> it's ` + note;
        if (noteNum > 43 && previousNoteNum < 43) {
            responseString += ` <speak> 
            You've gone beyond 43 notoriety, and will now include an extra black dice during the placement phase. 
            <break time="300ms"/>
            <audio src='soundbank://soundlibrary/magic/amzn_sfx_ghost_spooky_04'/> </speak>`
        }

        return handlerInput.responseBuilder.speak(responseString)
            .withShouldEndSession(false).withSimpleCard(`Reached44Note`, ``).getResponse();
    },
};

const AttackingAShipHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === 'AttackingAShip';
    },
    handle(handlerInput) {

        return handlerInput.responseBuilder.speak(ProcessBattle(''))
            .withShouldEndSession(false).withSimpleCard(`AttackingAShip`, ``).getResponse();
    },
};

const ShipAttackingMeHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === 'ShipAttackingMe';
    },
    handle(handlerInput) {

        let responseString = ``

        let diceRoll = Math.floor(Math.random() * 5) + 1;
        diceRoll = diceRoll + Math.floor(Math.random() * 5) + 1;

        if (diceRoll === 1){
            responseString = `<speak> The battle ship grazes your side, and luckily you took very little damage. They only rolled a ` + diceRoll + `
            <break time="300ms"/> <audio src='soundbank://soundlibrary/impacts/amzn_sfx_fireworks_01'/> 
             </speak>`;
        }
        else if (diceRoll > 2 && diceRoll < 5){
            responseString = `<speak> The battle ship tries mightily to spot you in the dark sea, but only rolls a ` + diceRoll + `
            <break time="300ms"/> <audio src='soundbank://soundlibrary/impacts/amzn_sfx_punch_03'/> 
             </speak>`;
        }
        else if (diceRoll > 4 && diceRoll < 9){
            responseString = `<speak> The battle ship strikes your port side hard.  You can see pieces falling into the sea.  They rolled a ` + diceRoll + `
            <break time="300ms"/> <audio src='soundbank://soundlibrary/nature/amzn_sfx_lightning_strike_02'/> 
             </speak>`;
        }
        else if (diceRoll > 8){
            responseString = `<speak> With fury, their canons ring out.  The battle ship rolled an impressive ` + diceRoll + `
            <break time="300ms"/> <audio src='soundbank://soundlibrary/battle/amzn_sfx_battle_yells_men_run_01'/>
             </speak>`;
        }

        return handlerInput.responseBuilder.speak(responseString)
            .withShouldEndSession(false).withSimpleCard(`ShipAttackingMe`, ``).getResponse();
    },
};

const MyShipTookDamageHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === 'MyShipTookDamage';
    },
    handle(handlerInput) {

        let responseString = ''
        const diceRoll = Math.floor(Math.random() * 5) + 1;
        if (diceRoll === 1){
            responseString = `<speak> Nemo himself takes a hit. His life drains.  
            <break time="300ms"/> <audio src='soundbank://soundlibrary/magic/amzn_sfx_ghost_spooky_04'/> 
            Deduct damage from the Nemo track. </speak>`;
        }
        else if  (diceRoll === 3 || diceRoll === 2){
            responseString = `<speak> The entire crew takes a hit. Everyone goes into a panic. 
            <break time="300ms"/> <audio src='soundbank://soundlibrary/battle/amzn_sfx_battle_yells_men_run_01'/> 
            Deduct damage from the crew track. </speak>`;
        }
        else {
            responseString = `<speak> The hull takes a hit. The ship rocks back and forth.  
            <break time="300ms"/> <audio src='soundbank://soundlibrary/nature/amzn_sfx_lightning_strike_02'/> 
            Deduct damage from the hull track. </speak>`;
        }

        return handlerInput.responseBuilder.speak(responseString)
            .withShouldEndSession(false).withSimpleCard(`MyShipTookDamage`, ``).getResponse();
    },
};

const StalkAttackHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === 'StalkAttack';
    },
    handle(handlerInput) {

        return handlerInput.responseBuilder.speak(ProcessBattle('stalk'))
            .withShouldEndSession(false).withSimpleCard(`StalkAttack`, ``).getResponse();
    },
};

const BoldAttackHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === 'BoldAttack';
    },
    handle(handlerInput) {

        return handlerInput.responseBuilder.speak(ProcessBattle('bold'))
            .withShouldEndSession(false).withSimpleCard(`BoldAttack`, ``).getResponse();
    },
};

const PlacementPhaseHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === 'PlacementPhase';
    },
    handle(handlerInput) {

        let act = 1;
        let note = 1;

        let text1 = '';
        try {
            const attributesManager = handlerInput.attributesManager;
            const sessionAttributes = attributesManager.getSessionAttributes();
            act = parseInt(sessionAttributes.act);
            note = parseInt(sessionAttributes.note);
            // text1 += `Act is ${act} and note is ${note}. `;
        } catch (e) {
            text1 += `Since you haven't told me your notoriety, nor act I'll assume 1 and 1. `;
        }

        if (!act && !note)
            text1 += `Since you haven't told me your notoriety, nor act. <break time="200ms"/> I'll assume 1 <break time="200ms"/> and 1. `;

        let wd = 2;
        let bd = 0;
        if (act === 2){
            wd = 2;
            bd = 1;
        }else if (act === 3){
            wd = 3;
            bd = 1;
        }
        if (note > 43)
            bd++;

        let hwd = 0;
        let lwd = 100;
        let prevD = 0;
        let lullTurn = 0;

        // white dice rolls
        let wdResult = '';
        for (let i=0; i<wd; i++){
            const currD = Math.floor(Math.random() * 5) + 1;
            if (prevD === currD)
                lullTurn = 1;
            prevD = currD;
            wdResult += currD + '<break time="300ms"/>, ';
            if (currD > hwd)
                hwd = currD;
            if (currD < lwd)
                lwd = currD;
        }

        if (hwd != lwd) {
            if ((hwd - lwd) === 1)
                text1 += "You receive " + (hwd - lwd).toString() + " action point. ";
            else
                text1 += "You receive " + (hwd - lwd).toString() + " action points. ";
            if (lullTurn === 1)
                text1 += " or choose a LULL turn. ";
        }
        else {
            text1 += "This will be a LULL turn. ";
        }

        // black dice rolls
        let bdResult = '';
        for (let i=0; i<bd; i++){
            const currD = Math.floor(Math.random() * 5) + 1;
            bdResult += currD + '<break time="300ms"/>, ';
        }

        text1 += '<break time="600ms"/> place ships at oceans ' + wdResult + bdResult;

        if (lullTurn === 1)
            text1 += ` and don't forget your treasure! `;

        return handlerInput.responseBuilder.speak(text1)
            .withShouldEndSession(false).withSimpleCard(`PlacementPhase`, ``).getResponse();
    },
};

const DiceRollHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === 'DiceRoll';
    },
    handle(handlerInput) {

        const dice = handlerInput.requestEnvelope.request.intent.slots.dice.value;
        let responseString = `<speak> <audio src="soundbank://soundlibrary/office/amzn_sfx_typing_short_02"/>
    You rolled ` + dice.toString() + ` dice. `;
        var diceResult = 0;
        for (var i = 0; i < parseInt(dice); i++) {
            const diceRoll = Math.floor(Math.random() * 6) + 1;
            diceResult += diceRoll;
            responseString = responseString + diceRoll.toString() + ' <break time="300ms"/> ';
        }
        responseString = responseString + ' totalling ' + diceResult + ' </speak>';

        return handlerInput.responseBuilder
            .speak(responseString)
            .withShouldEndSession(false)
            .getResponse();
    },
};

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak(`Nemo's War Helper activated.`)
            .withShouldEndSession(false)
            .getResponse();
    },
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {

        return handlerInput.responseBuilder
            .speak('Say things like Attacking A Ship, Performing a Bold Attack, or Starting Act 2.')
            .withShouldEndSession(false)
            .getResponse();
    },
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent' ||
                handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speechText = 'Goodbye!';

        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    },
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

        return handlerInput.responseBuilder.getResponse();
    },
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);

        return handlerInput.responseBuilder
            .speak('')
            .withShouldEndSession(false)
            .getResponse();
    },
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
    .addRequestHandlers(
        LaunchRequestHandler,
        DiceRollHandler,

        ActOneTwoThreeHandler,
        ReachedFortyFourNoteHandler,
        AttackingAShipHandler,
        ShipAttackingMeHandler,
        MyShipTookDamageHandler,
        StalkAttackHandler,
        BoldAttackHandler,
        PlacementPhaseHandler,

        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler
    )
    .addErrorHandlers(ErrorHandler)
    .lambda();
