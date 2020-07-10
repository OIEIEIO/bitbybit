import { Block, Blocks, FieldVariable, VARIABLE_CATEGORY_NAME } from 'blockly';
import * as JavaScript from 'blockly/javascript';
import { ResourcesInterface, ResourcesService } from '../../../resources';
import { createDummyAsyncLoadingIndicator, createStandardContextIIFE } from '../../_shared';
import { getRequired, BitByBitBlockHandlerService, ValidationEntityInterface } from '../../validations';

export function createThenBlock() {

    const resources = ResourcesService.getResources();
    const blockSelector = 'base_promises_then';

    Blocks[blockSelector] = {
        init() {
            this.appendValueInput('Promise')
                .setCheck('Promise')
                .appendField(resources.block_base_promises_then_input_promise_one)
                .appendField(new FieldVariable(resources.block_base_promises_then_var_result), 'Result')
                .appendField(resources.block_base_promises_then_input_promise_two);
            this.appendStatementInput('Then')
                .setCheck(null)
                .appendField(resources.block_base_promises_then_statement_catch.toLowerCase());
            createDummyAsyncLoadingIndicator(this, resources);
            this.setColour('#fff');
            this.setOutput(false);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setTooltip(resources.block_base_io_print_save_description);
        }
    };

    JavaScript[blockSelector] = (block: Block) => {
        const inputs = {
            result: JavaScript.variableDB_.getName(block.getFieldValue('Result'), VARIABLE_CATEGORY_NAME),
            promise: JavaScript.valueToCode(block, 'Promise', JavaScript.ORDER_ATOMIC),
            statement_then: JavaScript.statementToCode(block, 'Then'),
        };

        // this is first set of validations to check that all inputs are non empty strings
        BitByBitBlockHandlerService.validate(block, block.workspace, [{
            entity: inputs.promise,
            validations: [
                getRequired(resources, resources.block_promise)
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

            inputs.promise.then((res) => {
                block.inputList[2].setVisible(false);
                block.inputList[2].setAlign(-1);

                inputs.result = res;
                ${JavaScript.variableDB_.getName(block.getFieldValue('Result'), VARIABLE_CATEGORY_NAME)} = res;
                return inputs.statement_then();
            }, err => {
                block.inputList[2].setVisible(false);
                block.inputList[2].setAlign(-1);
                Promise.reject(err);
            });
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
