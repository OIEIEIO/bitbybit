import { ALIGN_RIGHT, Block, Blocks } from 'blockly';
import * as JavaScript from 'blockly/javascript';
import { ResourcesInterface, ResourcesService } from '../../../resources';
import { createStandardContextIIFE } from '../../_shared';
import { getRequired, makeRequiredValidationModelForInputs, BitByBitBlockHandlerService, ValidationEntityInterface } from '../../validations';

export function createDateSetUtcSecondsBlock() {

    const resources = ResourcesService.getResources();
    const blockSelector = 'base_date_set_utc_seconds';

    Blocks[blockSelector] = {
        init() {
            this.appendValueInput('Date')
                .setCheck('Date')
                .setAlign(ALIGN_RIGHT)
                .appendField(resources.block_base_date_set_utc_seconds_input_date);
            this.appendValueInput('Seconds')
                .setCheck('Number')
                .setAlign(ALIGN_RIGHT)
                .appendField(resources.block_base_date_set_utc_seconds_input_seconds.toLowerCase());
            this.setOutput(true, 'Number');
            this.setColour('#fff');
            this.setTooltip(resources.block_base_date_set_utc_seconds_description);
        }
    };

    JavaScript[blockSelector] = (block: Block) => {
        const inputs = {
            date: JavaScript.valueToCode(block, 'Date', JavaScript.ORDER_ATOMIC),
            seconds: JavaScript.valueToCode(block, 'Seconds', JavaScript.ORDER_ATOMIC),
        };
        // this is first set of validations to check that all inputs are non empty strings
        BitByBitBlockHandlerService.validate(block, block.workspace, makeRequiredValidationModelForInputs(resources, inputs, [
            resources.block_date, resources.block_second
        ]));

        // this creates validation model to be used at runtime to evaluate real values of inputs
        const runtimeValidationModel = makeRuntimeValidationModel(resources, Object.keys(inputs));
        (block as any).validationModel = runtimeValidationModel;

        const code = createStandardContextIIFE(block, blockSelector, inputs, true,
            `
return new Date(inputs.date.setUTCSeconds(inputs.seconds));
`
        );
        return [code, JavaScript.ORDER_ATOMIC];
    };
}

function makeRuntimeValidationModel(
    resources: ResourcesInterface,
    keys: string[]
): ValidationEntityInterface[] {
    return [{
        entity: keys[0],
        validations: [
            getRequired(resources, resources.block_date),
        ]
    }, {
        entity: keys[1],
        validations: [
            getRequired(resources, resources.block_second),
        ]
    }];
}