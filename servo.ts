namespace crickit {
    const SERVO_DC_MIN = 3277;
    const SERVO_DC_MAX = 6554;

    //% fixedInstances
    export class Servo {
        private _id: number;
        private _pin: number;

        constructor(id: number, pin: number) {
            this._id = id;
            this._pin = pin;
        }

        /**
         * set the servo angle
         */
        //% group="Servos"
        //% weight=100
        //% blockId=sawservosetangle block="crickit set %servo|angle to %value=protractorPicker|°"
        //% value.defl=90
        //% servo.fieldEditor="gridpicker"
        //% servo.fieldOptions.width=220
        //% servo.fieldOptions.columns=2
        //% blockGap=8
        setAngle(value: number) {
            const dev = saw();
            value = value | 0;
            value = mapClamp(value, 0, 180, SERVO_DC_MIN, SERVO_DC_MAX);
            dev.setPwmFreq(this._pin, 50);
            dev.analogWrite(this._pin, value);
        }

        /**
         * Set the throttle on a continuous servo
         * @param speed the throttle of the motor from -100% to 100%
         */
        //% group="Servos"
        //% weight=99
        //% blockId=sawservorun block="crickit continuous %servo|run at %speed=speedPicker|\\%"
        //% servo.fieldEditor="gridpicker"
        //% servo.fieldOptions.width=220
        //% servo.fieldOptions.columns=2
        run(speed: number): void {
            this.setAngle(mapClamp(speed, -100, 100, 0, 180));
        }        

        /*
         * set the pulse width to the servo in microseconds
         */
        //% group="Servos"
        //% weight=98
        //% blockId=sawservosetpulse block="crickit set %servo|pulse to %value|μs"
        //% value.min=500 value.max=2500
        //% value.defl=1500
        //% servo.fieldEditor="gridpicker"
        //% servo.fieldOptions.width=220
        //% servo.fieldOptions.columns=2
        setPulse(value: number) {
            const dev = saw();
            value = value | 0;
            value = Math.clamp(500, 2500, value);
            value = ((32767 * value) / 1000) | 0;
            value = Math.clamp(CRICKIT_PWM_MIN, CRICKIT_PWM_MAX, value);
            dev.setPwmFreq(this._pin, 50);
            dev.analogWrite(this._pin, value);
        }
    }

    //% fixedInstance block="servo 1"
    export const servo1 = new Servo(1, 17);
    //% fixedInstance block="servo 2"
    export const servo2 = new Servo(2, 16);
    //% fixedInstance block="servo 3"
    export const servo3 = new Servo(3, 15);
    //% fixedInstance block="servo 4"
    export const servo4 = new Servo(4, 14);
}