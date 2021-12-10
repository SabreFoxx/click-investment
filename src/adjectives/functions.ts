export function loadPlanDataForApexChartSeries(plan) {
    return plan?.DailyInterests.map(d => {
        return { x: d['createdAt'], y: d['gross'] }
    })
}

export function capitalizeFirstLetter(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}