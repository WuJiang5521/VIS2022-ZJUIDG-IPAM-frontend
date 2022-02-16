const months = [
    'Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'
];

export default function formatTime(date) {
    const currentTime = new Date();
    const curDay = currentTime.getDate();
    const [day, hour, min, sec] = [date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()];

    const time = `${hour}:${min}.${sec}`;
    if (curDay === day)
        return time;

    const month = date.getMonth();
    return `${months[month]} ${day} ` + time;
}
