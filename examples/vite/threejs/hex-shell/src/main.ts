import "./style.css";
import { BitByBitBase, Inputs } from "@bitbybit-dev/threejs";
import { model, type KernelOptions, current } from "./models";
import {
    initKernels,
    initThreeJS,
    createGui,
    createShapeLod1,
    createShapeLod2,
    createDirLightsAndGround,
    disableGUI,
    enableGUI,
    hideSpinner,
    showSpinner,
    downloadGLB,
    downloadSTL,
    downloadStep,
} from "./helpers";

const kernelOptions: KernelOptions = {
    enableOCCT: true,
    enableJSCAD: false,
    enableManifold: false,
};

start();

async function start() {
    const { scene } = initThreeJS();
    createDirLightsAndGround(scene, current);

    const bitbybit = new BitByBitBase();
    await initKernels(scene, bitbybit, kernelOptions);

    let finalShape: Inputs.OCCT.TopoDSShapePointer | undefined;
    let shapesToClean: Inputs.OCCT.TopoDSShapePointer[] = [];

    model.downloadStep = () => downloadStep(bitbybit, finalShape);
    model.downloadGLB = () => downloadGLB(scene);
    model.downloadSTL = () => downloadSTL(scene);

    createGui(current, model, updateShape);

    const rotationSpeed = 0.0005;
    const rotateGroup = () => {
        if (
            model.rotationEnabled &&
            current.group1 &&
            current.group2 &&
            current.dimensions
        ) {
            current.group1.rotation.y -= rotationSpeed;
            current.group2.rotation.y -= rotationSpeed;
            current.dimensions.rotation.y -= rotationSpeed;
        }
    };

    scene.onBeforeRender = () => {
        rotateGroup();
    };

    finalShape = await createShapeLod1(
        bitbybit,
        scene,
        model,
        shapesToClean,
        current
    );

    async function updateShape(finish: boolean) {
        disableGUI();
        showSpinner();
        current.group1?.traverse((obj) => {
            scene?.remove(obj);
        });
        current.group2?.traverse((obj) => {
            scene?.remove(obj);
        });
        current.dimensions?.traverse((obj) => {
            scene?.remove(obj);
        });
        if (finish) {
            finalShape = await createShapeLod2(
                bitbybit,
                scene,
                model,
                shapesToClean,
                current
            );
        } else {
            finalShape = await createShapeLod1(
                bitbybit,
                scene,
                model,
                shapesToClean,
                current
            );
        }
        hideSpinner();
        enableGUI();
    }
}
