import { Blocks, ALIGN_RIGHT } from "blockly";
import * as JavaScript from 'blockly/javascript';

export function createCoreVectorSignedAngleBetweenBlock() {

    Blocks['core_vector_signed_angle_between'] = {
        init: function () {
            this.appendValueInput("First")
                .setCheck("Vector3")
                .setAlign(ALIGN_RIGHT)
                .appendField("Signed angle between first vector");
            this.appendValueInput("Second")
                .setCheck("Vector3")
                .setAlign(ALIGN_RIGHT)
                .appendField("second vector");
            this.appendValueInput("Reference")
                .setCheck("Vector3")
                .setAlign(ALIGN_RIGHT)
                .appendField("and a reference vector");
            this.setOutput(true, "Number");
            this.setColour("#fff");
            this.setTooltip("Measures a signed angle between two vectors.");
            this.setHelpUrl("");
        }
    };

    JavaScript['core_vector_signed_angle_between'] = function (block) {
        var value_first = JavaScript.valueToCode(block, 'First', JavaScript.ORDER_ATOMIC);
        var value_second = JavaScript.valueToCode(block, 'Second', JavaScript.ORDER_ATOMIC);
        var value_reference = JavaScript.valueToCode(block, 'Reference', JavaScript.ORDER_ATOMIC);
        
        var code = `(() => verb.core.Vec.signedAngleBetween(${value_first}, ${value_second}, ${value_reference}))()`;
        return [code, JavaScript.ORDER_ATOMIC];
    };
}