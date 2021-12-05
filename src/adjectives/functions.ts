export function loadPlanDataForApexChartSeries(plan) {
    return plan?.DailyInterests.map(d => {
        return { x: d['createdAt'], y: d['gross'] }
    })
}