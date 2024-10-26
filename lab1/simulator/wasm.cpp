#include <emscripten.h>

#if defined(PART1)

#include "VConventionalAlarmClock.h"
auto* controller = new VConventionalAlarmClock;

#elif defined(PART2)

#include "VFrenchRepublicanAlarmClock.h"
auto* controller = new VFrenchRepublicanAlarmClock;

#elif defined(PART3)

#include "VFrenchRepublicanCalendarAlarmClock.h"
auto* controller = new VFrenchRepublicanCalendarAlarmClock;

#endif

extern "C" {
  void EMSCRIPTEN_KEEPALIVE clk() {
    controller->CLK = 0;
    controller->eval();
    controller->CLK = 1;
    controller->eval();
  }

  void EMSCRIPTEN_KEEPALIVE reset() {
    controller->CLR = 1;
    clk();
    controller->CLR = 0;
    clk();
  }

  int EMSCRIPTEN_KEEPALIVE get_seven_segment_output(int digit) {
    switch (digit) {
        case 0:
            return controller->SEG_SECONDS;
        case 1:
            return controller->SEG_MINUTES;
        case 2:
            return controller->SEG_HOURS;
#if defined(PART3)
        case 3:
            return controller->SEG_DAYS;
        case 4:
            return controller->SEG_WEEKS;
        case 5:
            return controller->SEG_MONTHS;
        case 6:
            return controller->SEG_YEARS;
#endif
        default:
            return controller->SEG_SECONDS;
    }
  }

  void EMSCRIPTEN_KEEPALIVE enable_setup_time() {
    controller->SETUP_TIME = 1;
    controller->eval();
  }

  void EMSCRIPTEN_KEEPALIVE disable_setup_time() {
    controller->SETUP_TIME = 0;
    controller->eval();
  }


  void EMSCRIPTEN_KEEPALIVE enable_setup_alarm() {
    controller->SETUP_ALARM = 1;
    controller->eval();
  }

  void EMSCRIPTEN_KEEPALIVE disable_setup_alarm() {
    controller->SETUP_ALARM = 0;
    controller->eval();
  }

  void EMSCRIPTEN_KEEPALIVE advance_minute() {
    controller->MIN_ADV = 1;
    controller->eval();
    controller->MIN_ADV = 0;
    controller->eval();
  }

  void EMSCRIPTEN_KEEPALIVE advance_hour() {
    controller->HR_ADV = 1;
    controller->eval();
    controller->HR_ADV = 0;
    controller->eval();
  }

#if defined(PART3)
  void EMSCRIPTEN_KEEPALIVE advance_day() {
    controller->DAY_ADV = 1;
    controller->eval();
    controller->DAY_ADV = 0;
    controller->eval();
  }

  void EMSCRIPTEN_KEEPALIVE advance_week() {
    controller->WEEK_ADV = 1;
    controller->eval();
    controller->WEEK_ADV = 0;
    controller->eval();
  }

  void EMSCRIPTEN_KEEPALIVE advance_month() {
    controller->MONTH_ADV = 1;
    controller->eval();
    controller->MONTH_ADV = 0;
    controller->eval();
  }
#endif // defined(PART3)

  int EMSCRIPTEN_KEEPALIVE get_buzzer() {
    return controller->BUZZ;
  }
}
