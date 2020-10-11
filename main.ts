radio.onReceivedNumber(function (receivedNumber) {
    if (HideSeek == 2) {
        radio.sendNumber(0)
    }
})
function getSignalStrength () {
    pollSignalStrength = 0
    for (let index = 0; index < 5; index++) {
        radio.sendNumber(0)
        basic.pause(50)
        pollSignalStrength += radio.receivedPacket(RadioPacketProperty.SignalStrength)
    }
    SignalStrength = pollSignalStrength / 5
    basic.showNumber(SignalStrength)
}
input.onButtonPressed(Button.A, function () {
    if (HideSeek == 0) {
        HideSeek = 1
    }
    radio.sendValue("HideSeek", HideSeek)
})
input.onButtonPressed(Button.B, function () {
    HideSeek = 0
    radio.sendValue("HideSeek", 0)
    basic.clearScreen()
    basic.showString("Reset")
})
radio.onReceivedValue(function (name, value) {
    if (name == "HideSeek") {
        if (value == 1) {
            HideSeek = 2
            basic.showString("Hide!!")
        } else {
            if (value == 2) {
                HideSeek = 1
                basic.showString("Seek!!")
            } else {
                HideSeek = 0
                basic.clearScreen()
                basic.showString("Reset")
            }
        }
    }
})
let SignalStrength = 0
let pollSignalStrength = 0
let HideSeek = 0
let SetRadioChannel = 10
HideSeek = 0
radio.setGroup(SetRadioChannel)
basic.forever(function () {
    if (HideSeek == 1) {
        getSignalStrength()
        if (SignalStrength <= -90) {
            basic.showLeds(`
                . . . . .
                . . . . .
                . . # . .
                . . . . .
                . . . . .
                `)
        } else if (SignalStrength >= -50) {
            basic.showIcon(IconNames.Heart)
        } else if (SignalStrength >= -69) {
            basic.showLeds(`
                # . # . #
                . # # # .
                # # . # #
                . # # # .
                # . # . #
                `)
        } else if (SignalStrength >= -79) {
            basic.showLeds(`
                . . # . .
                . # # # .
                # # . # #
                . # # # .
                . . # . .
                `)
        } else if (SignalStrength >= -85) {
            basic.showLeds(`
                . . . . .
                . # # # .
                . # . # .
                . # # # .
                . . . . .
                `)
        } else {
            basic.showLeds(`
                . . . . .
                . . # . .
                . # . # .
                . . # . .
                . . . . .
                `)
        }
    }
})
