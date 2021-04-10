/**
* Functions to UVA by ELECFREAKS Co.,Ltd.
*/
//% color=#FF0000  icon="\uf072" block="Drones" blockId="Drones"
namespace Drones {
    let rxBuff = pins.createBuffer(3)
    export enum Basicoptions{
        //% block="Take off" 
        Take_off = 0x01,
        //% block="Landing"
        Landing = 0x02
    }
    export enum Urgentoptions{
        //% block="Emergency stop"
        Emergency_stop = 0x05
    }
    export enum Directionoptions{
        //% block="Up" 
        Up = 0x10,
        //% block="Down"
        Down = 0x11,
        //% block="Forward" 
        Forward = 0x12,
        //% block="Backward"
        Backward = 0x13,
        //% block="Left" 
        Left = 0x14,
        //% block="Right"
        Right = 0x15
    }
    export enum Angleoptions{
        //% block="Left" 
        Take_off = 0x16,
        //% block="Right"
        Landing = 0x17
    }
    export enum Rolloptions{
        //% block="Roll forward" 
        Roll_forward = 0x20,
        //% block="Roll back"
        Roll_back = 0x21,
        //% block="Roll left" 
        Roll_left = 0x22,
        //% block="Roll right"
        Roll_right = 0x23
    }
    export enum Sensoroptions{
        //% block="Voltage" 
        Voltage = 0x01,
        //% block="Height"
        Height = 0x02
    }
    function Dronesback():boolean{
        basic.pause(300)
        rxBuff = serial.readBuffer(3)
        if(rxBuff[0] == 0x01 && rxBuff[1] == 0x01){
            return true
        }
        else if(rxBuff[0] == 0x01 && rxBuff[1] == 0x02){
            //执行错误
        }
        else{
            return false
        }
        return false
    }
    /**
     * Shows a rainbow pattern on all LEDs.
     * @param startHue the start hue value for the rainbow, eg: 1
     * @param endHue the end hue value for the rainbow, eg: 360
     */
    //% block="Initialize UAV"
    //% weight=100
    export function initModule():void{
        serial.redirect(SerialPin.P1, SerialPin.P2, 115200)
        control.inBackground(function () {
            let txBuff = pins.createBuffer(2)
            txBuff[0] = 0xAF
            txBuff[1] = 0xFA
            serial.writeBuffer(txBuff)
            basic.pause(1000)
        })
    }
    /**
     * Shows a rainbow pattern on all LEDs.
     * @param startHue the start hue value for the rainbow, eg: 1
     * @param endHue the end hue value for the rainbow, eg: 360
     */
    //% block="Basic action %basicstate"
    //% weight=90
    export function Basic_action(basicstate: Basicoptions): void {
        let txBuff = pins.createBuffer(4)
        let rxBuff = pins.createBuffer(3)
        txBuff[0] = 0xEF
        txBuff[1] = 0
        txBuff[2] = 0x01
        txBuff[3] = basicstate
        serial.writeBuffer(txBuff)
        //while(!Dronesback());
    }
    /**
     * Shows a rainbow pattern on all LEDs.
     * @param startHue the start hue value for the rainbow, eg: 1
     * @param endHue the end hue value for the rainbow, eg: 360
     */
    //% block="Urgent action %urgentstate"
    //% weight=80
    export function Urgent_action(urgentstate:Urgentoptions):void{
        let txBuff = pins.createBuffer(4)
        let rxBuff = pins.createBuffer(3)
        txBuff[0] = 0xEF
        txBuff[1] = 0
        txBuff[2] = 0x01
        txBuff[3] = urgentstate
        serial.writeBuffer(txBuff)
        //while(!Dronesback());
    }
    /**
     * Shows a rainbow pattern on all LEDs.
     * @param startHue the start hue value for the rainbow, eg: 1
     * @param endHue the end hue value for the rainbow, eg: 360
     */
    //% block="Move action %basicstate by %distance cm"
    //% weight=70
    export function Move_action(basicstate: Directionoptions,distance:number): void {
        let txBuff = pins.createBuffer(6)
        let rxBuff = pins.createBuffer(3)
        txBuff[0] = 0xEF
        txBuff[1] = 2
        txBuff[2] = 0x01
        txBuff[3] = basicstate
        if(distance > 255){
            txBuff[4] = 255
            txBuff[5] = distance - 255
        }
        else{
            txBuff[4] = distance
            txBuff[5] = 0
        }
        serial.writeBuffer(txBuff)
        //while(!Dronesback());
    }
    //% block="UAV hovering %time S"
    //% weight=60
    export function Hovering(time:number):void{
        let txBuff = pins.createBuffer(5)
        txBuff[0] = 0xEF
        txBuff[1] = 1
        txBuff[2] = 0x01
        txBuff[3] = 0x04
        txBuff[4] = time
        serial.writeBuffer(txBuff)
        basic.pause(time * 1000)
    }
    /**
     * Shows a rainbow pattern on all LEDs.
     * @param startHue the start hue value for the rainbow, eg: 1
     * @param endHue the end hue value for the rainbow, eg: 360
     */
    //% block="Get %state Value"
    //% weight=50
    export function Get_Sensor(state:Sensoroptions): number{
        let txBuff = pins.createBuffer(4)
        let rxBuff = pins.createBuffer(3)
        txBuff[0] = 0xEF
        txBuff[1] = 0
        txBuff[2] = 0x02
        txBuff[3] = state
        serial.writeBuffer(txBuff)
        rxBuff = serial.readBuffer(3)
        return rxBuff[2]<<8 + rxBuff[1]
    }

}