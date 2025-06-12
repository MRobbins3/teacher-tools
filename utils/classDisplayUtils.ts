type LunchTrack = "A" | "B" | "C" | null

type Period = {
    name: string
    start: string
    end: string
    tracks?: LunchTrack[] // undefined = all tracks
}
// Helper to add Morning and Evening periods to any schedule array
function addMorningEveningPeriods(schedule: Period[]): Period[] {
    return [
        { name: "Morning", start: "00:00", end: schedule[0]!.start },
        ...schedule,
        { name: "Evening", start: schedule[schedule.length - 1]!.end, end: "23:59" }
    ]
}

const mondayTuesdayFridaySchedule: Period[] = addMorningEveningPeriods([
    { name: "1st Hour", start: "07:45", end: "08:30" },
    { name: "2nd Hour", start: "08:35", end: "09:20" },
    { name: "3rd Hour", start: "09:25", end: "10:10" },
    { name: "4th Hour", start: "10:15", end: "11:00" },

    { name: "5A LUNCH", start: "11:00", end: "11:30", tracks: ["A"] },
    { name: "5A CLASS", start: "11:35", end: "12:20", tracks: ["A"] },
    { name: "6A CLASS", start: "12:25", end: "13:10", tracks: ["A"] },

    { name: "5B CLASS", start: "11:05", end: "11:50", tracks: ["B"] },
    { name: "5B LUNCH", start: "11:50", end: "12:20", tracks: ["B"] },
    { name: "6B CLASS", start: "12:25", end: "13:10", tracks: ["B"] },

    { name: "5C CLASS", start: "11:05", end: "11:50", tracks: ["C"] },
    { name: "6C CLASS", start: "11:55", end: "12:40", tracks: ["C"] },
    { name: "C LUNCH", start: "12:40", end: "13:10", tracks: ["C"] },

    { name: "7th Hour", start: "13:15", end: "14:00" },
    { name: "8th Hour", start: "14:05", end: "14:50" },
])

const wednesdaySchedule: Period[] = addMorningEveningPeriods([
    { name: "1st Hour", start: "07:45", end: "09:10" },
    { name: "Dragon Time", start: "09:15", end: "09:45" },
    { name: "3", start: "09:50", end: "11:15" },

    { name: "5A LUNCH", start: "11:20", end: "11:50", tracks: ["A"] },
    { name: "5A CLASS", start: "11:55", end: "13:20", tracks: ["A"] },

    { name: "5B CLASS", start: "11:20", end: "12:03", tracks: ["B"] },
    { name: "5B LUNCH", start: "12:05", end: "12:35", tracks: ["B"] },
    { name: "5B CLASS", start: "12:38", end: "13:20", tracks: ["B"] },

    { name: "5C CLASS", start: "11:20", end: "12:45", tracks: ["C"] },
    { name: "C LUNCH", start: "12:50", end: "13:20", tracks: ["C"] },

    { name: "7th Hour", start: "13:25", end: "14:50" },
])

const thursdaySchedule: Period[] = addMorningEveningPeriods([
    { name: "2nd Hour", start: "07:45", end: "09:10" },
    { name: "Dragon Time or Pathways", start: "09:15", end: "09:45" },
    { name: "4th Hour", start: "09:50", end: "11:15" },

    { name: "6A LUNCH", start: "11:20", end: "11:50", tracks: ["A"] },
    { name: "6A CLASS", start: "11:55", end: "13:20", tracks: ["A"] },

    { name: "6B CLASS", start: "11:20", end: "12:03", tracks: ["B"] },
    { name: "6B LUNCH", start: "12:05", end: "12:35", tracks: ["B"] },
    { name: "6B CLASS", start: "12:38", end: "13:20", tracks: ["B"] },

    { name: "6C CLASS", start: "11:20", end: "12:45", tracks: ["C"] },
    { name: "6C LUNCH", start: "12:50", end: "13:20", tracks: ["C"] },

    { name: "8th Hour", start: "13:25", end: "14:50" },
])

function parseTimeToMinutes(timeStr: string): number {
    const [h, m] = timeStr.split(":").map(Number)
    return h! * 60 + m!
}

export function getCurrentPeriod(date: Date = new Date(), lunchTrack: LunchTrack = null): string {
    const day = date.getDay()

    if (day === 0 || day === 6) {
        return "Weekend"
    }

    let todaySchedule: Period[]

    switch(day) {
        case 1:
        case 2:
        case 5:
            todaySchedule = mondayTuesdayFridaySchedule
            break
        case 3:
            todaySchedule = wednesdaySchedule
            break
        case 4:
            todaySchedule = thursdaySchedule
            break
        default:
            // This should never happen since weekends return early,
            // but add this to satisfy TypeScript.
            throw new Error("Unexpected day")
    }

    const currentMinutes = date.getHours() * 60 + date.getMinutes()

    for (const period of todaySchedule) {
        if (period.tracks && lunchTrack && !period.tracks.includes(lunchTrack)) {
            continue
        }

        const startMins = parseTimeToMinutes(period.start)
        const endMins = parseTimeToMinutes(period.end)

        if (currentMinutes >= startMins && currentMinutes < endMins) {
            return period.name
        }
    }

    return "No period"
}
