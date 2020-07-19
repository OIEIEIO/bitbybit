import { Block, Blocks, FieldVariable, VARIABLE_CATEGORY_NAME, ALIGN_RIGHT } from 'blockly';
import * as JavaScript from 'blockly/javascript';
import { ResourcesInterface, ResourcesService } from '../../../resources';
import { createDummyAsyncLoadingIndicator, createStandardContextIIFE } from '../../_shared';
import { getRequired, BitByBitBlockHandlerService, ValidationEntityInterface } from '../../validations';

export function createExecuteLaterBlock() {

    const resources = ResourcesService.getResources();
    const blockSelector = 'base_async_execute_later';

    Blocks[blockSelector] = {
        init() {
            this.appendValueInput('Timeout')
                .setCheck('Number')
                .appendField(resources.block_base_async_execute_later_handler_input_timeout);
            this.appendDummyInput('Unit')
                .setAlign(ALIGN_RIGHT)
                .appendField(resources.block_base_async_execute_later_handler_input_unit.toLowerCase());
            this.appendStatementInput('Then')
                .setCheck(null)
                .appendField(resources.block_base_async_execute_later_handler_statement_then.toLowerCase());
            createDummyAsyncLoadingIndicator(this, resources);
            this.setColour('#fff');
            this.setInputsInline(true);
            this.setOutput(false);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setTooltip(resources.block_base_async_execute_later_handler_description);
        }
    };

    JavaScript[blockSelector] = (block: Block) => {
        const inputs = {
            timeout: JavaScript.valueToCode(block, 'Timeout', JavaScript.ORDER_ATOMIC),
            statement_then: JavaScript.statementToCode(block, 'Then'),
        };
        // this is first set of validations to check that all inputs are non empty strings
        BitByBitBlockHandlerService.validate(block, block.workspace, [{
            entity: inputs.timeout,
            validations: [
                getRequired(resources, resources.block_timeout)
            ]
        }]);

        // this creates validation model to be used at runtime to evaluate real values of inputs
        const runtimeValidationModel = makeRuntimeValidationModel(resources, Object.keys(inputs));
        (block as any).validationModel = runtimeValidationModel;
        return createStandardContextIIFE(block, blockSelector, inputs, false,
            `
            const block = blocklyWorkspace.getBlockById('${block.id}');
            block.inputList[2].setVisible(true);
            block.inputList[2].setAlign(-1);

            setTimeout(() => {
                block.inputList[2].setVisible(false);
                block.inputList[2].setAlign(-1);
                inputs.statement_then();
            }, inputs.timeout * 1000);
`);
    };
}

function makeRuntimeValidationModel(
    resources: ResourcesInterface,
    keys: string[]
): ValidationEntityInterface[] {

    return [{
        entity: keys[1],
        validations: [
            getRequired(resources, resources.block_promise),
        ]
    }];
}
