export function loadPlanDataForApexChartSeries(plan) {
    return plan?.DailyInterests.map(d => {
        return { x: d['createdAt'], y: d['gross'] }
    })
}

export function capitalizeFirstLetter(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

export function getMaxLetters(string, maxLength) {
    return string.length > maxLength ?
        string.substring(0, maxLength - 3) + '...' :
        string;
};