def on_button_pressed_a():
    global HideSeek
    if HideSeek == 0:
        HideSeek = 1
    radio.send_value("HideSeek", HideSeek)
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_b():
    global HideSeek
    HideSeek = 0
    radio.send_value("HideSeek", 0)
    basic.clear_screen()
    basic.show_string("Reset")
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_received_value(name, value):
    global HideSeek
    if name == "HideSeek":
        if value == 1:
            HideSeek = 2
            basic.show_string("Hide!!")
        else:
            if value == 2:
                HideSeek = 1
                basic.show_string("Seek!!")
            else:
                HideSeek = 0
                basic.clear_screen()
                basic.show_string("Reset")
radio.on_received_value(on_received_value)

SignalStrength = 0
HideSeek = 0
SetRadioChannel = 10
HideSeek = 0
radio.set_group(SetRadioChannel)

def on_forever():
    global SignalStrength
    if HideSeek == 1:
        SignalStrength = radio.received_packet(RadioPacketProperty.SIGNAL_STRENGTH)
        if SignalStrength <= -120:
            basic.show_leds("""
                . . . . .
                . . . . .
                . . # . .
                . . . . .
                . . . . .
                """)
        elif SignalStrength >= -45:
            basic.show_icon(IconNames.HEART)
        elif SignalStrength >= -60:
            basic.show_leds("""
                # . # . #
                . # # # .
                # # . # #
                . # # # .
                # . # . #
                """)
        elif SignalStrength >= -80:
            basic.show_leds("""
                . . # . .
                . # # # .
                # # . # #
                . # # # .
                . . # . .
                """)
        elif SignalStrength >= -100:
            basic.show_leds("""
                . . . . .
                . # # # .
                . # . # .
                . # # # .
                . . . . .
                """)
        else:
            basic.show_leds("""
                . . . . .
                . . # . .
                . # . # .
                . . # . .
                . . . . .
                """)
        basic.pause(250)
    else:
        if HideSeek == 2:
            radio.send_number(0)
            basic.pause(250)
basic.forever(on_forever)
