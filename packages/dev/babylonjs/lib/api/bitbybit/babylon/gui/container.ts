
import { Context } from "../../../context";
import * as BABYLON from "../../../../gui-enriched-babylon";
import * as Inputs from "../../../inputs";

export class BabylonGuiContainer {

    constructor(private readonly context: Context) { }

    /**
     * Adds controls to container and keeps the order
     * @param inputs with container and controls
     * @returns container
     * @group controls
     * @shortname add controls to container
     */
    addControls(inputs: Inputs.BabylonGui.AddControlsToContainerDto): BABYLON.GUI.Container {
        if(inputs.clearControlsFirst && inputs.container.clearControls){
            inputs.container.clearControls();
        }
        inputs.controls.forEach(control => inputs.container.addControl(control));
        return inputs.container;
    }

    /**
     * Sets the container background
     * @param inputs container and background
     * @group set
     * @shortname set container background
     */
    setBackground(inputs: Inputs.BabylonGui.SetContainerBackgroundDto): BABYLON.GUI.Container {
        inputs.container.background = inputs.background;
        return inputs.container;
    }

    /**
     * Sets the container is readonly
     * @param inputs container and is readonly
     * @group set
     * @shortname set container is readonly
     */
    setIsReadonly(inputs: Inputs.BabylonGui.SetContainerIsReadonlyDto): BABYLON.GUI.Container {
        inputs.container.isReadOnly = inputs.isReadOnly;
        return inputs.container;
    }

    /**
     * Gets the container background
     * @param inputs container
     * @group get
     * @shortname get container background
     */
    getBackground(inputs: Inputs.BabylonGui.ContainerDto): string {
        return inputs.container.background;
    }

    /**
     * Gets the container is readonly
     * @param inputs container
     * @group get
     * @shortname get container is readonly
     */
    getIsReadonly(inputs: Inputs.BabylonGui.ContainerDto): boolean {
        return inputs.container.isReadOnly;
    }

}
