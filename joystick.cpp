#include "pxt.h"

using namespace pxt;
//% weight=10 color=#DF6721 icon="\uf11b" block="joystick"
namespace joystick {
    bool initialized = false;

    //%
    void init() {
        if (initialized) return;

    // mount buttons on the pins with a pullup mode
    // TODO: fix this issue in the DAL itself
#define ALLOC_PIN_BUTTON(id) new MicroBitButton(getPin(id)->name, id, MICROBIT_BUTTON_ALL_EVENTS, PullUp);
    ALLOC_PIN_BUTTON(MICROBIT_ID_IO_P8)
//    ALLOC_PIN_BUTTON(MICROBIT_ID_IO_P1)
//    ALLOC_PIN_BUTTON(MICROBIT_ID_IO_P2)
#undef ALLOC_PIN_BUTTON

        initialized = true;
    }

    void forever_stubdf(void *a) {
      while (true) {
        runAction0((Action)a);
        fiber_sleep(20);
      }
    }

    //%
    void Shake(Action a) {
        if (a != 0) {
            incr(a);
            create_fiber(forever_stubdf, (void*)a);
        }
    }
}
