export const datepickerLangs = {
    zh: {
        formatLocale: {
            months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            monthsShort: ["1 月", "2 月", "3 月", "4 月", "5 月", "6 月", "7 月", "8 月", "9 月", "10 月", "11 月", "12 月"],
            weekdays: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
            weekdaysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
            weekdaysMin: ["日", "一", "二", "三", "四", "五", "六"],
            firstDayOfWeek: 1,
            firstWeekContainsDate: 4,
            meridiemParse: / 上午 | 下午 /,
            meridiem: function meridiem(hour) {
                if (hour < 12) {
                    return "上午";
                }

                return "下午";
            },
            isPM: function isPM(input) {
                return input === "下午";
            }
        },
        yearFormat: "YYYY年",
        monthFormat: "MMM",
        monthBeforeYear: false
    },
    en: {
        formatLocale: {
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            weekdays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            weekdaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            weekdaysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            firstDayOfWeek: 0,
            firstWeekContainsDate: 1
        }
    },
    yearFormat: "YYYY",
    monthFormat: "MMM",
    monthBeforeYear: true
};

 