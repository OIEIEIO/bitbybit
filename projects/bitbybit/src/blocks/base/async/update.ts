import { Block, Blocks, FieldVariable, VARIABLE_CATEGORY_NAME } from 'blockly';
import * as JavaScript from 'blockly/javascript';
import { ResourcesService } from '../../../resources';
import { createDummyAsyncLoadingIndicator, createStandardContextIIFE } from '../../_shared';

export function createUpdateBlock() {

    const resources = ResourcesService.getResources();
    const blockSelector = 'base_time_update';

    Blocks[blockSelector] = {
        init() {
            this.appendDummyInput('RegisterRenderLoopListener')
                .appendField(resources.block_babylon_update_input_register_render_loop_listener)
                .appendField(new FieldVariable(resources.block_babylon_update_input_time_passed), 'TimePassedMs');
            this.appendStatementInput('Update')
                .setCheck(null)
                .appendField(resources.block_babylon_update_input_update.toLowerCase());
            createDummyAsyncLoadingIndicator(this, resources);
            this.setColour('#fff');
            this.setOutput(false);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setTooltip(resources.block_babylon_update_description);
        }
    };

    JavaScript[blockSelector] = (block: Block) => {
        const inputs = {
            statement_update: JavaScript.statementToCode(block, 'Update'),
        };

        return createStandardContextIIFE(block, blockSelector, inputs, false,
            `
            BitByBit.BitByBitBlocklyHelperService.renderLoopBag.push((timePassedMs) => {
                ${JavaScript.variableDB_.getName(block.getFieldValue('TimePassedMs'), VARIABLE_CATEGORY_NAME)} = timePassedMs;
                inputs.statement_update();
            });
`);
    };
}