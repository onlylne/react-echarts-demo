
const formatHours = (hour: number) => {
  if (hour < 10) return `0${hour}:00`;
  return `${hour}:00`;
}

const getRandom = (num: number, range: number) => {
  let val: number = num + (Math.random() * range)
  return Math.ceil(val);
}

export {
  formatHours,
  getRandom
}