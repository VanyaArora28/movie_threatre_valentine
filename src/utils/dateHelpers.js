import {
    differenceInYears,
    differenceInMonths,
    differenceInDays,
    differenceInHours,
    differenceInMinutes,
    differenceInSeconds,
    addYears,
    addMonths,
    addDays,
    addHours,
    addMinutes,
    isBefore,
    isAfter,
    startOfDay
} from 'date-fns'

// Reference date: October 15, 2025
export const REFERENCE_DATE = new Date(2025, 9, 15, 0, 0, 0) // Month is 0-indexed

// Valentine's Day 2026
export const VALENTINES_DAY = new Date(2026, 1, 14, 0, 0, 0)

/**
 * Calculate runtime from reference date (Oct 15, 2025) to now
 * Returns object with years, months, days, hours, minutes, seconds
 */
export function calculateRuntime() {
    const now = new Date()
    let remaining = new Date(now)

    const years = differenceInYears(remaining, REFERENCE_DATE)
    remaining = addYears(REFERENCE_DATE, years)

    const months = differenceInMonths(now, remaining)
    remaining = addMonths(remaining, months)

    const days = differenceInDays(now, remaining)
    remaining = addDays(remaining, days)

    const hours = differenceInHours(now, remaining)
    remaining = addHours(remaining, hours)

    const minutes = differenceInMinutes(now, remaining)
    remaining = addMinutes(remaining, minutes)

    const seconds = differenceInSeconds(now, remaining)

    return {
        years,
        months,
        days,
        hours,
        minutes,
        seconds
    }
}

/**
 * Calculate countdown to Valentine's Day 2026
 * Returns object with days, hours, minutes, seconds
 */
export function calculateCountdown() {
    const now = new Date()

    if (isAfter(now, VALENTINES_DAY)) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    let remaining = new Date(VALENTINES_DAY)

    const days = differenceInDays(remaining, now)
    remaining = addDays(now, days)

    const hours = differenceInHours(VALENTINES_DAY, remaining)
    remaining = addHours(remaining, hours)

    const minutes = differenceInMinutes(VALENTINES_DAY, remaining)
    remaining = addMinutes(remaining, minutes)

    const seconds = differenceInSeconds(VALENTINES_DAY, remaining)

    return {
        days,
        hours,
        minutes,
        seconds
    }
}

/**
 * Check if a specific day is unlocked based on current date
 * Days are Feb 7-14, 2026
 */
export function isDayUnlocked(dayNumber) {
    const now = new Date()

    // Target Date: Feb 'dayNumber', 2026 at Midnight (00:00:00)
    // Note: Month '1' is February in JavaScript
    const unlockDate = new Date(2026, 1, dayNumber, 0, 0, 0)

    // Unlock if 'now' is equal to or later than the unlock date
    return now >= unlockDate
}

/**
 * Format number with leading zero
 */
export function padZero(num) {
    return String(num).padStart(2, '0')
}
