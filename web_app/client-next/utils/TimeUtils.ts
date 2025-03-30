// Format rest time in a readable format
export const formatRestTime = (seconds?: number) => {
  if (!seconds) return 'No rest'
  if (seconds < 60) return `${seconds}s`
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return remainingSeconds > 0
    ? `${minutes}m ${remainingSeconds}s`
    : `${minutes}m`
}
