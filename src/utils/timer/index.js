function handleBpm(bpm) {
  const secondsInMinute = 60
  const bpmAsNumber = Number(bpm)

  const timer = (secondsInMinute / bpmAsNumber) * 1000

  return timer
}

function handleNoteValue(fn, noteValue) {
  return fn * noteValue
}


export {
  handleBpm,
  handleNoteValue
}
