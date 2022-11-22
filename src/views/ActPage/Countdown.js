export default function countdown(diff) {
    var remainingTime = 0
    var secondsPerDay = 24 * 3600
    var secondsPerHour = 3600
    var secondsPerMinute = 60

    $('.timer').each(function () {
        var type = $(this).attr('data-type')
        var value = 0

        switch (type) {
            case 'day':
                value = diff._data.days <= 0 ? 0 : diff._data.days;
                remainingTime += (value * secondsPerDay)
                break;

            case 'hour':
                value = diff._data.hours <= 0 ? 0 : diff._data.hours;
                remainingTime += (value * secondsPerHour)
                break;

            case 'minute':
                value = diff._data.minutes <= 0 ? 0 : diff._data.minutes;
                remainingTime += (value * secondsPerMinute)
                break;

            case 'second':
                value = diff._data.seconds <= 0 ? 0 : diff._data.seconds;
                remainingTime += value
                if (value < 10) value = '0' + value
                break;
        }

        $(this).text(value)
    })


    var interval = setInterval(function () {
        remainingTime -= 1
        if (remainingTime < 1) {
            clearInterval(interval)
            return;
        }

        var days = parseInt(remainingTime / secondsPerDay)
        var hours = parseInt((remainingTime - (days * secondsPerDay)) / secondsPerHour)
        var minutes = parseInt((remainingTime - (days * secondsPerDay) - (hours * secondsPerHour)) / secondsPerMinute)
        var seconds = remainingTime % 60

        if (seconds < 10) seconds = '0' + seconds
        $('.timer[data-type=second]').text(seconds)
        if (seconds == 59) {
            $('.timer[data-type=minute]').text(minutes)
            $('.timer[data-type=hour]').text(hours)
            $('.timer[data-type=day]').text(days)
        }
    }, 1000)

}