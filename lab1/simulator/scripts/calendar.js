let reverse_mapping = {
    8127: 0,
    8070: 1,
    8155: 2,
    8143: 3,
    8166: 4,
    8173: 5,
    8189: 6,
    8071: 7,
    8191: 8,
    8167: 9,
    831: 10,
    774: 11,
    859: 12,
    847: 13,
    870: 14,
    877: 15,
    893: 16,
    775: 17,
    895: 18,
    871: 19,
    11711: 20,
    11654: 21,
    11739: 22,
    11727: 23,
    11750: 24,
    11757: 25,
    11773: 26,
    11655: 27,
    11775: 28,
    11751: 29,
    10175: 30,
    10118: 31,
    10203: 32,
    10191: 33,
    10214: 34,
    10221: 35,
    10237: 36,
    10119: 37,
    10239: 38,
    10215: 39,
    13119: 40,
    13062: 41,
    13147: 42,
    13135: 43,
    13158: 44,
    13165: 45,
    13181: 46,
    13063: 47,
    13183: 48,
    13159: 49,
    14015: 50,
    13958: 51,
    14043: 52,
    14031: 53,
    14054: 54,
    14061: 55,
    14077: 56,
    13959: 57,
    14079: 58,
    14055: 59,
    16063: 60,
    16006: 61,
    16091: 62,
    16079: 63,
    16102: 64,
    16109: 65,
    16125: 66,
    16007: 67,
    16127: 68,
    16103: 69,
    959: 70,
    902: 71,
    987: 72,
    975: 73,
    998: 74,
    1005: 75,
    1021: 76,
    903: 77,
    1023: 78,
    999: 79,
    16319: 80,
    16262: 81,
    16347: 82,
    16335: 83,
    16358: 84,
    16365: 85,
    16381: 86,
    16263: 87,
    16383: 88,
    16359: 89,
    13247: 90,
    13190: 91,
    13275: 92,
    13263: 93,
    13286: 94,
    13293: 95,
    13309: 96,
    13191: 97,
    13311: 98,
    13287: 99
}
let clock_text = document.getElementById("clock-text");
let date_text= document.getElementById("date-text");
let week_text = document.getElementById("week-text");
let setup_time = false;
let setup_alarm = false;

function createDisplay(id) {
    let div = document.createElement('div');
    div.innerHTML = `<svg id="display-${id}" width="130" height="240" viewBox="0 0 260 480">
                    <use id="segment-${id}a" xlink:href="#unit-h" class="segment" x="30" y="0"></use>
                    <use id="segment-${id}b" xlink:href="#unit-v" class="segment" x="220" y="30"></use>
                    <use id="segment-${id}c" xlink:href="#unit-v" class="segment" x="220" y="250"></use>
                    <use id="segment-${id}d" xlink:href="#unit-h" class="segment" x="30" y="440"></use>
                    <use id="segment-${id}e" xlink:href="#unit-v" class="segment" x="0" y="250"></use>
                    <use id="segment-${id}f" xlink:href="#unit-v" class="segment" x="0" y="30"></use>
                    <use id="segment-${id}g" xlink:href="#unit-h" class="segment" x="30" y="220"></use>
                </svg>`

    return div;
}

function setButtons() {
    const setup = setup_time || setup_alarm;
    document.getElementById("adv-min-button").disabled = !setup;
    document.getElementById("adv-hr-button").disabled = !setup;
    document.getElementById("adv-day-button").disabled = !setup;
    document.getElementById("adv-week-button").disabled = !setup;
    document.getElementById("adv-month-button").disabled = !setup;

    if (setup_time) {
        document.getElementById("setup-time-switch").classList.remove("outline");
        document.getElementById("setup-time-switch").innerText = "Exit Setup Time"
    } else {
        document.getElementById("setup-time-switch").classList.add("outline");
        document.getElementById("setup-time-switch").innerText = "Enter Setup Time"
    }

    if (setup_alarm) {
        document.getElementById("setup-alarm-switch").classList.remove("outline");
        document.getElementById("setup-alarm-switch").innerText = "Exit Setup Alarm"
    } else {
        document.getElementById("setup-alarm-switch").classList.add("outline");
        document.getElementById("setup-alarm-switch").innerText = "Enter Setup Alarm"
    }
}

function toggleSetupTime() {
    setup_time = !setup_time;
    if (setup_time) {
        Module._enable_setup_time();
    } else {
        Module._disable_setup_time();
    }
    setButtons();
    updateTime();
}

function toggleSetupAlarm() {
    setup_alarm = !setup_alarm;
    if (setup_alarm) {
        Module._enable_setup_alarm();
    } else {
        Module._disable_setup_alarm();
    }
    setButtons();
    updateTime();
}

function advanceMinute() {
    for (let i = 0; i < parseInt(document.getElementById("num-increment").value); i++) {
        Module._advance_minute()
    }
    updateTime();
}

function advanceHour() {
    for (let i = 0; i < parseInt(document.getElementById("num-increment").value); i++) {
        Module._advance_hour()
    }
    updateTime();
}

function advanceDay() {
    for (let i = 0; i < parseInt(document.getElementById("num-increment").value); i++) {
        Module._advance_day()
    }
    updateTime();
}

function advanceWeek() {
    for (let i = 0; i < parseInt(document.getElementById("num-increment").value); i++) {
        Module._advance_week()
    }
    updateTime();
}

function advanceMonth() {
    for (let i = 0; i < parseInt(document.getElementById("num-increment").value); i++) {
        Module._advance_month()
    }
    updateTime();
}


function updateAlarm() {
    function loadSVG(filePath) {
        fetch(filePath)
            .then(response => response.text())
            .then(svgContent => {
                document.getElementById('alarm').innerHTML = svgContent;
            })
            .catch(error => console.error('Error loading SVG:', error));
    }

    Module._get_buzzer() === 0 ? loadSVG("../assets/alarm_off.svg") : loadSVG("../assets/alarm_on.svg");
}

function getTimeString(seconds, minutes, hours) {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function getDateString(day, month, year) {
    return `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year.toString().padStart(2, '0')}`;
}

function updateTime() {
    clock_text.innerText = getTimeString(
        reverse_mapping[Module._get_seven_segment_output(0)],
        reverse_mapping[Module._get_seven_segment_output(1)],
        reverse_mapping[Module._get_seven_segment_output(2)]
    );
    date_text.innerText = getDateString(
        10 * reverse_mapping[Module._get_seven_segment_output(4)] + reverse_mapping[Module._get_seven_segment_output(3)],
        reverse_mapping[Module._get_seven_segment_output(5)],
        reverse_mapping[Module._get_seven_segment_output(6)]
    );
    week_text.innerText = `Week: ${reverse_mapping[Module._get_seven_segment_output(4)]}`;
}

let currentInterval = setInterval(() => {
        Module._clk();
        updateAlarm();
        updateTime();
    },
    1000
);

function updateInterval() {
    const val = document.getElementById("update-interval").value
    if (val > 0) {
        document.getElementById("update-interval").setAttribute("aria-invalid", false);
        clearInterval(currentInterval);
        currentInterval = setInterval(() => {
            Module._clk();
            updateAlarm();
            updateTime();
        }, parseInt(val));
    } else {
        document.getElementById("update-interval").setAttribute("aria-invalid", true);
    }
}