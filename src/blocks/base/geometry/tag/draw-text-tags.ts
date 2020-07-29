import { ALIGN_RIGHT, Block, Blocks } from 'blockly';
import * as JavaScript from 'blockly/javascript';
import { ResourcesInterface, ResourcesService } from '../../../../resources';
import { createStandardContextIIFE } from '../../../_shared';
import {
    getRequired,
    makeRequiredValidationModelForInputs,
    BitByBitBlockHandlerService,
    ValidationEntityInterface
} from '../../../validations';

export function createDrawTextTagsBlock() {

    const resources = ResourcesService.getResources();
    const blockSelector = 'base_geometry_draw_text_tags';

    Blocks[blockSelector] = {
        init() {
            this.appendValueInput('TextTags')
                .setCheck('Array')
                .setAlign(ALIGN_RIGHT)
                .appendField(resources.block_base_geometry_draw_text_tags_input_text_tags);
            this.setOutput(false);
            this.setColour('#fff');
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setTooltip(resources.block_base_geometry_draw_text_tags_description);
        }
    };

    JavaScript[blockSelector] = (block: Block) => {
        const inputs = {
            textTags: JavaScript.valueToCode(block, 'TextTags', JavaScript.ORDER_ATOMIC),
        };

        // this is first set of validations to check that all inputs are non empty strings
        BitByBitBlockHandlerService.validate(block, block.workspace, makeRequiredValidationModelForInputs(resources, inputs, [
            resources.block_text_tags
        ]));

        // this creates validation model to be used at runtime to evaluate real values of inputs
        const runtimeValidationModel = makeRuntimeValidationModel(resources, Object.keys(inputs));
        (block as any).validationModel = runtimeValidationModel;

        return createStandardContextIIFE(block, blockSelector, inputs, false,
            `
            inputs.textTags.forEach((tag, index) => {
                const textNode = document.createElement('span');
                const id = '_tag' + ${new Date().getTime()} + BitByBitBlocklyHelperService.tagBag.length;
                tag.id = id;
                textNode.id = id;
                textNode.textContent = tag.text;
                document.querySelector('.canvasZone').appendChild(textNode);
                tag.needsUpdate = true;
                BitByBitBlocklyHelperService.tagBag.push(tag);
            });

`);
    };
}

function makeRuntimeValidationModel(
    resources: ResourcesInterface,
    keys: string[]
): ValidationEntityInterface[] {

    return [{
        entity: keys[0],
        validations: [
            getRequired(resources, resources.block_text_tags),
        ]
    }];
}