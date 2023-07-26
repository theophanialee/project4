export default function getTimeDifference(timestamp) {
  const currentTime = new Date();
  const postTime = new Date(timestamp);
  const timeDifferenceInSeconds = Math.floor((currentTime - postTime) / 1000);

  if (timeDifferenceInSeconds < 60) {
    return `${timeDifferenceInSeconds}s`;
  } else {
    const timeDifferenceInMinutes = Math.floor(timeDifferenceInSeconds / 60);

    if (timeDifferenceInMinutes < 60) {
      return `${timeDifferenceInMinutes}m`;
    } else {
      const timeDifferenceInHours = Math.floor(timeDifferenceInMinutes / 60);
      if (timeDifferenceInHours < 24) {
        return `${timeDifferenceInHours}h`;
      } else {
        const timeDifferenceInDays = Math.floor(timeDifferenceInHours / 24);
        return `${timeDifferenceInDays}d`;
      }
    }
  }
}
