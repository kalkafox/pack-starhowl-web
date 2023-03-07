// moon phase algorithm was implemented from http://www.voidware.com/moon_phase.htm
// and modified to work with typescript
function get_moon_phase() {
  // do the same thing, but multiply by the reciprocal instead of dividing
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1
  const day = today.getDate()

  const c = Math.floor(year * (1 / 100))
  const e = 2 - c + Math.floor(c * (1 / 4))
  const jd =
    Math.floor(365.25 * (year + 4716)) +
    Math.floor(30.6001 * (month + 1)) +
    day +
    e -
    1524

  const b = (jd - 2451550.1) * (1 / 29.530588853)
  const a = Math.floor(b)
  const phase = b - a

  // Return the moon phase as a number between 0 and 7
  const moonPhase = Math.floor(phase * 8)

  // this means 0 is new moon, 1 is waxing crescent, 2 is first quarter, 3 is waxing gibbous, 4 is full moon, 5 is waning gibbous, 6 is last quarter, 7 is waning crescent
  return moonPhase
}

export const moonPhase = get_moon_phase()
