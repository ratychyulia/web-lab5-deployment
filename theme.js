// Денна тема: з 07:00 до 21:00, нічна — увесь інший час
export const LIGHT_FROM_HOUR = 7
export const LIGHT_UNTIL_HOUR = 21

export function autoTheme(date = new Date()) {
  const hour = date.getHours()
  return hour >= LIGHT_FROM_HOUR && hour < LIGHT_UNTIL_HOUR ? 'light' : 'dark'
}
