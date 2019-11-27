const sortByDate = (a, b) =>  new Date(a).valueOf() - new Date(b).valueOf();

const getDayForEvent = outing => {
    const date = new Date(outing.date);
    date.setMilliseconds(0);
    date.setSeconds(0);
    date.setMinutes(0);
    date.setHours(0);
    return date.toISOString();
};

const groupByDay = outings => {
    const groups = outings.reduce((days, outing) => {
        const day = getDayForEvent(outing);
        if (!days[day]) {
            days[day] = [];
        }
        days[day] = days[day].concat({...outing, expanded:false});
        return days;
    }, {});
    return {
        days: Object.keys(groups).sort(sortByDate),
        outingsByDay: groups,
    };
};

export default groupByDay;