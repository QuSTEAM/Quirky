import Complex from "src/math/Complex.js"
import Gate from "src/circuit/Gate.js"
import GateFactory from "src/ui/GateFactory.js"
import MathPainter from "src/ui/MathPainter.js"
import Matrix from "src/math/Matrix.js"
import Rect from "src/math/Rect.js"

let Gates = {};
export default Gates;

Gates.Named = {
    Special: {
        Control: new Gate(
            "•",
            Matrix.CONTROL,
            "Control",
            "Modifies linked operations to only happen when the control qubit is ON.",
            "The control 'gate' is a modifier of other operations. " +
                "It conditions them to only occur in the parts of the superposition where the control qubit is ON. " +
                "It applies to all operation in the same column.",
            args => {
                if (args.isInToolbox || args.isHighlighted) {
                    GateFactory.DEFAULT_DRAWER(args);
                }
                args.painter.fillCircle(args.rect.center(), 5, "black");
            }),

        AntiControl: new Gate(
            "◦",
            Matrix.ANTI_CONTROL,
            "Anti-Control",
            "Modifies linked operations to only happen when the control qubit is OFF.",
            "The anti-control 'gate' is a modifier of other operations. " +
                "It conditions them to only occur in the parts of the superposition where the control qubit is OFF (" +
                "the opposite of the usual control gate). " +
                "It applies to all operation in the same column.",
            args => {
                if (args.isInToolbox || args.isHighlighted) {
                    GateFactory.DEFAULT_DRAWER(args);
                }
                let p = args.rect.center();
                args.painter.fillCircle(p, 5);
                args.painter.strokeCircle(p, 5);
            }),

        Peek: new Gate(
            "Peek",
            Matrix.identity(2),
            "Peek",
            "Shows the chance that a wire is ON.",
            "Peeking does not affect the result or perform a measurement, though that would be required in practice. " +
                "In addition to showing the probability that a measurement of the wire at the gate's position would " +
                "return ON instead of OFF, Peek can show the conditional probability ('t|c') of ON-ness given that " +
                "the controls were satisfied when affected by controls.",
            args => {
                if (args.positionInCircuit === null || args.isHighlighted) {
                    GateFactory.DEFAULT_DRAWER(args);
                    return;
                }

                //let p = args.circuitContext.gateColumn.measureProbabilityOn(
                //    args.circuitContext.wireIndex,
                //    args.circuitContext.state);
                //if (p.canDiffer) {
                //    MathPainter.paintConditionalProbabilityBox(
                //        args.painter,
                //        p.probabilityOfCondition,
                //        p.probabilityOfHitGivenCondition,
                //        args.rect);
                //} else {
                //    MathPainter.paintProbabilityBox(
                //        args.painter,
                //        p.probabilityOfCondition * p.probabilityOfHitGivenCondition,
                //        args.rect);
                //}
            }),

        SwapHalf: new Gate(
            "Swap",
            Matrix.square([1, 0, 0, 0,
                0, 0, 1, 0,
                0, 1, 0, 0,
                0, 0, 0, 1]),
            "Swap Gate [Half]",
            "Swaps the values of two qubits.",
            "Place two swap gate halves in the same column to form a swap gate.",
            args => {
                if (args.isInToolbox || args.isHighlighted) {
                    GateFactory.DEFAULT_DRAWER(args);
                    return;
                }

                let swapRect = Rect.centeredSquareWithRadius(args.rect.center(), args.rect.w / 6);
                args.painter.strokeLine(swapRect.topLeft(), swapRect.bottomRight());
                args.painter.strokeLine(swapRect.topRight(), swapRect.bottomLeft());
            })
    },

    QuarterTurns: {
        Down: new Gate(
            "X^+½",
            Matrix.fromPauliRotation(0.25, 0, 0),
            "Down Gate",
            "(Another) Half of a Not.",
            "The Down gate cycles through OFF, (1+i)(OFF - i ON), ON, and (1-i)(OFF + i ON). " +
                "It is a 90\u00B0 rotation around the Bloch Sphere's X axis. " +
                "It is a square root of the Pauli X gate, and applying it twice is equivalent to a NOT. " +
                "Its inverse is the Up gate.",
            GateFactory.POWER_DRAWER),

        Up: new Gate(
            "X^-½",
            Matrix.fromPauliRotation(0.75, 0, 0),
            "Up Gate [Beam Splitter]",
            "Half of a Not. Acts like optical beam splitters.",
            "The Up gate cycles through the states OFF, (1-i)(OFF + i ON), ON, and (1+i)(OFF - i ON). " +
                "It is a 90\u00B0 rotation around the Bloch Sphere's X axis. " +
                "It is a square root of the Pauli X gate, and applying it twice is equivalent to a NOT. " +
                "Its inverse is the Down gate.",
            GateFactory.POWER_DRAWER),

        Right: new Gate(
            "Y^+½",
            Matrix.fromPauliRotation(0, 0.25, 0),
            "Right Gate",
            "Half of a Y Gate.",
            "The Right gate cycles through OFF, (1+i)(OFF + ON), i ON, and (1-i)(OFF - ON). " +
                "It is a 90\u00B0 rotation around the Bloch Sphere's Y axis. " +
                "It is a square root of the Pauli Y gate. " +
                "Its inverse is the Left gate.",
            GateFactory.POWER_DRAWER),

        Left: new Gate(
            "Y^-½",
            Matrix.fromPauliRotation(0, 0.75, 0),
            "Left Gate",
            "(Another) Half of a Y Gate.",
            "The Left gate cycles through OFF, (1-i)(OFF - ON), i ON, and (1+i)(OFF + ON). " +
                "It is a 90\u00B0 rotation around the Bloch Sphere's Y axis. " +
                "It is a square root of the Pauli Y gate. " +
                "Its inverse is the Right gate.",
            GateFactory.POWER_DRAWER),

        CounterClockwise: new Gate(
            "Z^+½",
            Matrix.fromPauliRotation(0, 0, 0.25),
            "Counter-Clockwise Phase Gate",
            "Phases ON by a factor of i, without affecting OFF.",
            "The Counter-Clockwise Phase Gate is a 90\u00B0 rotation around the Bloch Sphere's Z axis. " +
                "It is a square root of the Pauli Z gate. " +
                "Its inverse is the Clockwise Phase Gate.",
            GateFactory.POWER_DRAWER),

        Clockwise: new Gate(
            "Z^-½",
            Matrix.fromPauliRotation(0, 0, 0.75),
            "Clockwise Phase Gate",
            "Phases ON by a factor of -i, without affecting OFF.",
            "The Clockwise Phase Gate is a 90\u00B0 rotation around the Bloch Sphere's Z axis. " +
                "It is a square root of the Pauli Z gate. " +
                "Its inverse is the Counter-Clockwise Phase Gate.",
            GateFactory.POWER_DRAWER)
    },
    HalfTurns: {
        X: new Gate(
            "X",
            Matrix.PAULI_X,
            "Not Gate [Pauli X Gate]",
            "Toggles between ON and OFF.",
            "The Not Gate is a 180° turn around the Bloch Sphere's X axis. " +
                "Pairs states that differ only in the value of target qubit, and swaps their amplitudes. " +
                "Combine with Control gates to create Controlled-Not and Toffoli gates.",
            args => {
                let noControlsInColumn =
                    args.positionInCircuit === null ||
                    args.stats.circuitDefinition.columns[args.positionInCircuit.col].gates.every(
                        e => e !== Gates.Named.Special.Control && e !== Gates.Named.Special.AntiControl);
                if (noControlsInColumn || args.isHighlighted) {
                    GateFactory.DEFAULT_DRAWER(args);
                    return;
                }

                let drawArea = args.rect.scaledOutwardBy(0.6);
                args.painter.fillCircle(drawArea.center(), drawArea.w / 2);
                args.painter.strokeCircle(drawArea.center(), drawArea.w / 2);
                args.painter.strokeLine(drawArea.topCenter(), drawArea.bottomCenter());
                args.painter.strokeLine(drawArea.centerLeft(), drawArea.centerRight());
            }),

        Y: new Gate(
            "Y",
            Matrix.PAULI_Y,
            "Pauli Y Gate",
            "A combination of the X and Z gates.",
            "The Pauli Y gate is a 180° turn around the Bloch Sphere's Y axis. " +
                "It is equivalent to an X gate followed by a Z gate, up to a global phase factor.",
            GateFactory.DEFAULT_DRAWER),

        Z: new Gate(
            "Z",
            Matrix.PAULI_Z,
            "Phase Flip Gate [Pauli Z Gate]",
            "Negates the phase of ON states, without affecting OFF states.",
            "The Phase Flip Gate is a 180° around the Bloch Sphere's Z axis." +
                "Negates the amplitude of parts of the superposition where the target qubit is ON.",
            GateFactory.DEFAULT_DRAWER),

        H: new Gate(
            "H",
            Matrix.HADAMARD,
            "Hadamard Gate",
            "Creates/cancels uniform superpositions.",
            "The Hadamard gate is the simplest non-classical gate. " +
                "Toggles ON to ON+OFF and back, but toggles OFF to ON-OFF and back. " +
                "Applying once to each wire, in the starting state, creates a uniform superposition of all states. " +
                "Corresponds to a 180° around the Bloch Sphere's diagonal X+Z axis.",
            GateFactory.DEFAULT_DRAWER)
    },
    Exponentiating: {
        ExpiX: new Gate(
            "e^+iXt",
                t => {
                let r = (t % 1) * Math.PI * 2;
                let c = Math.cos(r);
                let s = new Complex(0, Math.sin(r));
                return Matrix.square([c, s, s, c]);
            },
            "Evolving Exponential X Gate",
            "Interpolates between no-op and the Not Gate over time, without introducing imaginary factors.",
            "(The downside of not using complex factors is that it takes two turns to get back to the start point. " +
            "After the first turn, there's a global phase factor of -1 leftover.)",
            GateFactory.CYCLE_DRAWER),

        AntiExpiX: new Gate(
            "e^-iXt",
                t => {
                let r = (-t % 1) * Math.PI * 2;
                let c = Math.cos(r);
                let s = new Complex(0, Math.sin(r));
                return Matrix.square([c, s, s, c]);
            },
            "Evolving Exponential X Gate",
            "Interpolates between no-op and the Not Gate over time, without introducing imaginary factors.",
            "(The downside of not using complex factors is that it takes two turns to get back to the start point. " +
            "After the first turn, there's a global phase factor of -1 leftover.)",
            GateFactory.CYCLE_DRAWER),

        ExpiY: new Gate(
            "e^+iYt",
                t => {
                let r = (t % 1) * Math.PI * 2;
                let c = Math.cos(r);
                let s = Math.sin(r);
                return Matrix.square([c, -s, s, c]);
            },
            "Evolving Rotation Gate",
            "Interpolates between no-op and the Not Gate over time, without introducing imaginary factors.",
            "(The downside of not using complex factors is that it takes two turns to get back to the start point. " +
            "After the first turn, there's a global phase factor of -1 leftover.)",
            GateFactory.CYCLE_DRAWER),

        AntiExpiY: new Gate(
            "e^-iYt",
                t => {
                let r = (-t % 1) * Math.PI * 2;
                let c = Math.cos(r);
                let s = Math.sin(r);
                return Matrix.square([c, -s, s, c]);
            },
            "Evolving Rotation Gate",
            "Interpolates between no-op and the Not Gate over time, without introducing imaginary factors.",
            "(The downside of not using complex factors is that it takes two turns to get back to the start point. " +
            "After the first turn, there's a global phase factor of -1 leftover.)",
            GateFactory.CYCLE_DRAWER),

        ExpiZ: new Gate(
            "e^+iZt",
                t => {
                let r = (t % 1) * Math.PI * 2;
                let c = Math.cos(r);
                let s = Math.sin(r);
                return Matrix.square([new Complex(c, s), 0, 0, new Complex(c, -s)]);
            },
            "Evolving Exponential Z Gate",
            "Interpolates between no-op and the Not Gate over time, without introducing imaginary factors.",
            "(The downside of not using complex factors is that it takes two turns to get back to the start point. " +
            "After the first turn, there's a global phase factor of -1 leftover.)",
            GateFactory.CYCLE_DRAWER),

        AntiExpiZ: new Gate(
            "e^-iZt",
                t => {
                let r = (-t % 1) * Math.PI * 2;
                let c = Math.cos(r);
                let s = Math.sin(r);
                return Matrix.square([new Complex(c, s), 0, 0, new Complex(c, -s)]);
            },
            "Evolving Exponential Z Gate",
            "Interpolates between no-op and the Not Gate over time, without introducing imaginary factors.",
            "(The downside of not using complex factors is that it takes two turns to get back to the start point. " +
            "After the first turn, there's a global phase factor of -1 leftover.)",
            GateFactory.CYCLE_DRAWER)
    },
    Powering: {
        X: new Gate(
            "X^t",
                t => Matrix.fromPauliRotation(t % 1, 0, 0),
            "Evolving X Gate",
            "Interpolates between no-op and the Not Gate over time.",
            "Performs a continuous phase-corrected rotation around the Bloch Sphere's X axis.",
            GateFactory.CYCLE_DRAWER),

        AntiX: new Gate(
            "X^-t",
                t => Matrix.fromPauliRotation((1-t) % 1, 0, 0),
            "Evolving Anti X Gate",
            "Interpolates between no-op and the Not Gate over time.",
            "Performs a continuous phase-corrected counter rotation around the Bloch Sphere's X axis.",
            GateFactory.CYCLE_DRAWER),

        Y: new Gate(
            "Y^t",
                t => Matrix.fromPauliRotation(0, t % 1, 0),
            "Evolving Y Gate",
            "Interpolates between no-op and the Pauli Y Gate over time.",
            "Performs a continuous phase-corrected rotation around the Bloch Sphere's Y axis.",
            GateFactory.CYCLE_DRAWER),

        AntiY: new Gate(
            "Y^-t",
                t => Matrix.fromPauliRotation(0, (1-t) % 1, 0),
            "Evolving Anti Y Gate",
            "Interpolates between no-op and the Pauli Y Gate over time.",
            "Performs a continuous phase-corrected counter rotation around the Bloch Sphere's Y axis.",
            GateFactory.CYCLE_DRAWER),

        Z: new Gate(
            "Z^t",
                t => Matrix.fromPauliRotation(0, 0, t % 1),
            "Evolving Z Gate",
            "Interpolates between no-op and the Phase Flip Gate over time.",
            "Performs a continuous phase-corrected rotation around the Bloch Sphere's Z axis.",
            GateFactory.CYCLE_DRAWER),

        AntiZ: new Gate(
            "Z^-t",
                t => Matrix.fromPauliRotation(0, 0, (1-t) % 1),
            "Evolving Anti Z Gate",
            "Interpolates between no-op and the Phase Flip Gate over time.",
            "Performs a continuous phase-corrected counter rotation around the Bloch Sphere's Z axis.",
            GateFactory.CYCLE_DRAWER)
    },
    Silly: {
        FUZZ_SYMBOL: "Fuzz",
        FUZZ_MAKER: () => new Gate(
            Gates.Named.Silly.FUZZ_SYMBOL,
            Matrix.square([
                new Complex(Math.random() - 0.5, Math.random() - 0.5),
                new Complex(Math.random() - 0.5, Math.random() - 0.5),
                new Complex(Math.random() - 0.5, Math.random() - 0.5),
                new Complex(Math.random() - 0.5, Math.random() - 0.5)
            ]).closestUnitary(),
            "Fuzz Gate",
            "Differs every time you grab a new one.",
            "",
            GateFactory.MATRIX_SYMBOL_DRAWER_EXCEPT_IN_TOOLBOX),

        //CREATION: new Gate(
        //    "!Creation",
        //    Matrix.square([0, 1, 0, 0]),
        //    "Creation operator [NOT UNITARY]",
        //    "Increases the value of the wire, increasing false to true and increase true to ... uh...\n" +
        //    "\n" +
        //    "May cause the annihilation of all things.",
        //    true),
        //
        //ANNIHILATION: new Gate(
        //    "!Annihilation",
        //    Matrix.square([0, 0, 1, 0]),
        //    "Annihilation Operator [NOT UNITARY]",
        //    "Decreases the value of the wire, decreasing true to false and decreasing false to ... uh...\n" +
        //    "\n" +
        //    "May cause the annihilation of all things.",
        //    true),

        RESET: new Gate(
            "!Reset",
            Matrix.square([1, 1, 0, 0]),
            "Reset Gate [NOT UNITARY]",
            "Sends all amplitude into the OFF state, then renormalizes.",
            "Bad things happen when the ON and OFF amplitudes destructively interfere. " +
                "Equivalent to post-selection (modulo some Hadamard gates).",
            GateFactory.DEFAULT_DRAWER),

        POST_SELECT: new Gate(
            "!Select",
            Matrix.square([0, 0, 0, 1]),
            "Post-selection Gate",
            "Discards OFF states, then renormalizes.",
            "Search terms: PostBQP, Quantum Suicide, Weak Measurement.",
            GateFactory.DEFAULT_DRAWER),

        VOID: new Gate(
            "!Void",
            Matrix.square([0, 0, 0, 0]),
            "Void Gate [NOT UNITARY]",
            "Zeroes all amplitudes, then renormalizes.",
            "This kills the universe. If you use controls then it post-selects on the controls being met.",
            GateFactory.DEFAULT_DRAWER)
    }
};

/** @type {!Array<!{hint: !string, gates: !Array<?Gate>}>} */
Gates.Sets = [
    {
        hint: "Special",
        gates: [
            Gates.Named.Special.Control,
            Gates.Named.Special.SwapHalf,
            Gates.Named.Special.Peek,
            Gates.Named.Special.AntiControl
        ]
    },
    {
        hint: "Half Turns",
        gates: [
            Gates.Named.HalfTurns.H,
            null,
            null,
            Gates.Named.HalfTurns.X,
            Gates.Named.HalfTurns.Y,
            Gates.Named.HalfTurns.Z
        ]
    },
    {
        hint: "Quarter Turns (+/-)",
        gates: [
            Gates.Named.QuarterTurns.Down,
            Gates.Named.QuarterTurns.Right,
            Gates.Named.QuarterTurns.CounterClockwise,
            Gates.Named.QuarterTurns.Up,
            Gates.Named.QuarterTurns.Left,
            Gates.Named.QuarterTurns.Clockwise
        ]
    },
    {
        hint: "Powering",
        gates: [
            Gates.Named.Powering.X,
            Gates.Named.Powering.Y,
            Gates.Named.Powering.Z,
            Gates.Named.Powering.AntiX,
            Gates.Named.Powering.AntiY,
            Gates.Named.Powering.AntiZ
        ]
    },
    {
        hint: "Exponentiating",
        gates: [
            Gates.Named.Exponentiating.ExpiX,
            Gates.Named.Exponentiating.ExpiY,
            Gates.Named.Exponentiating.ExpiZ,
            Gates.Named.Exponentiating.AntiExpiX,
            Gates.Named.Exponentiating.AntiExpiY,
            Gates.Named.Exponentiating.AntiExpiZ
        ]
    },
    {
        hint: "Targeted",
        gates: [
            GateFactory.fromTargetedRotation(-1/3, "Y^a-√⅓"),
            GateFactory.fromTargetedRotation(-2/3, "Y^a-√⅔"),
            null,
            GateFactory.fromTargetedRotation(1/3, "Y^a√⅓"),
            GateFactory.fromTargetedRotation(2/3, "Y^a√⅔")
        ]
    },
    {
        hint: "Other Z",
        gates: [
            GateFactory.fromPauliRotation(0, 0, 1 / 6, "Z^+⅓"),
            GateFactory.fromPauliRotation(0, 0, 1 / 8, "Z^+¼"),
            GateFactory.fromPauliRotation(0, 0, 1 / 16, "Z^+⅛"),
            GateFactory.fromPauliRotation(0, 0, -1 / 6, "Z^-⅓"),
            GateFactory.fromPauliRotation(0, 0, -1 / 8, "Z^-¼"),
            GateFactory.fromPauliRotation(0, 0, -1 / 16, "Z^-⅛")
        ]
    },
    {
        hint: "Silly",
        gates: [
            Gates.Named.Silly.FUZZ_MAKER(),
            null,
            null,
            Gates.Named.Silly.POST_SELECT,
            Gates.Named.Silly.RESET,
            Gates.Named.Silly.VOID
        ]
    }
];

/** @type {!(!Gate[])} */
Gates.KnownToSerializer = [
    Gates.Named.Special.Control,
    Gates.Named.Special.SwapHalf,
    Gates.Named.Special.Peek,
    Gates.Named.Special.AntiControl,
    Gates.Named.HalfTurns.H,
    Gates.Named.HalfTurns.X,
    Gates.Named.HalfTurns.Y,
    Gates.Named.HalfTurns.Z,
    Gates.Named.QuarterTurns.Down,
    Gates.Named.QuarterTurns.Right,
    Gates.Named.QuarterTurns.CounterClockwise,
    Gates.Named.QuarterTurns.Up,
    Gates.Named.QuarterTurns.Left,
    Gates.Named.QuarterTurns.Clockwise,
    Gates.Named.Powering.X,
    Gates.Named.Powering.Y,
    Gates.Named.Powering.Z,
    Gates.Named.Powering.AntiX,
    Gates.Named.Powering.AntiY,
    Gates.Named.Powering.AntiZ,
    Gates.Named.Exponentiating.ExpiX,
    Gates.Named.Exponentiating.ExpiY,
    Gates.Named.Exponentiating.ExpiZ,
    Gates.Named.Exponentiating.AntiExpiX,
    Gates.Named.Exponentiating.AntiExpiY,
    Gates.Named.Exponentiating.AntiExpiZ
];
