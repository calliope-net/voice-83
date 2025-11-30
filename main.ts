function macheEtwas (id: number) {
    if (id == 45) {
        basic.clearScreen()
    } else if (id >= 52 && id <= 61) {
        pins.comment(pins.pins_text("Display number zero 52=0 .. 61=9"))
        basic.showNumber(id - 52)
    } else if (id == 62) {
        basic.showIcon(IconNames.Happy)
    } else if (id == 63) {
        basic.showIcon(IconNames.Sad)
    } else if (id == 64) {
        basic.showIcon(IconNames.Heart)
    } else if (id == 65) {
        basic.clearScreen()
    } else if (id == 69) {
        basic.showNumber(input.temperature())
    } else if (id == 82) {
        control.reset()
    } else if (id == 116) {
        basic.setLedColor(0xff0000)
    } else if (id == 123) {
        basic.setLedColor(0xffffff)
    } else {
        basic.turnRgbLedOff()
    }
}
function Zeile1_7 (text: string) {
    matrix.clearMatrix(1, 7)
    zeilen = Math.trunc(text.length / 16)
    for (let Index = 0; Index <= zeilen; Index++) {
        matrix.writeTextCharset(Index + 1, 0, matrix.matrix_text(text.substr(Index * 16, 16)))
    }
    matrix.displayMatrix(1, 7, matrix.eI2C.I2C_x3C)
}
function Zeile0 (zahl: number) {
    matrix.clearMatrix(0, 0)
    matrix.writeTextCharset(0, 0, zahl)
    matrix.displayMatrix(0, 0, matrix.eI2C.I2C_x3C)
}
let Kommando_ID = 0
let zeilen = 0
matrix.init(matrix.ePages.y64)
matrix.displayMatrix()
let wachzeit = pins.voice_register(pins.pins_voice_eRegister(pins.voice_eRegister.WAKE_TIME))
Zeile0(wachzeit)
let connected = wachzeit > 0
if (connected) {
    basic.setLedColor(0x00ff00)
} else {
    basic.setLedColor(0xff0000)
}
Zeile1_7("DFRobot Gravity I2C Offline Language Learning Voice Recognition Sensor für Calliope v3 mit Erweiterung MKleinSB/pxt-DFRobot_voiceRecognition")
basic.forever(function () {
    if (connected) {
        Kommando_ID = pins.voice_read_cmdid()
        if (Kommando_ID == 0) {
            basic.pause(2000)
        } else {
            Zeile0(Kommando_ID)
            Zeile1_7(pins.voice_command_text(Kommando_ID))
            macheEtwas(Kommando_ID)
        }
    }
})
