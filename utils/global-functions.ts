export default {
  greet(name: string) {
    console.log(`Hello, ${name}!`);
  },
  durationToMilliseconds(duration: string) {
    // Split the duration string into its parts
    const parts = duration.split(":");

    // Convert the hours, minutes, and seconds to integers
    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    const seconds = parseInt(parts[2], 10);

    // Extract the milliseconds from the seconds part
    const milliseconds = parts[2].split(".")[1];

    // Convert the duration to milliseconds and return the result
    return (
      hours * 3600000 +
      minutes * 60000 +
      seconds * 1000 +
      parseInt(milliseconds, 10)
    );
  },
  millisecondsToDuration(milliseconds: number) {
    // Calculate the number of hours, minutes, and seconds from the milliseconds
    const hours = Math.floor(milliseconds / 3600000);
    milliseconds %= 3600000;
    const minutes = Math.floor(milliseconds / 60000);
    milliseconds %= 60000;
    const seconds = Math.floor(milliseconds / 1000);
    milliseconds %= 1000;

    // Pad the hours, minutes, and seconds with leading zeros as necessary
    const hoursStr: string = hours.toString().padStart(2, "0");
    const minutesStr: string = minutes.toString().padStart(2, "0");
    const secondsStr: string = seconds.toString().padStart(2, "0");
    const millisecondsStr: string = milliseconds.toString().padStart(3, "0");

    const duration: [] = [];

    if (hoursStr !== "00") {
      duration.push(hoursStr + ":");
    }

    if (minutesStr !== "00") {
      duration.push(minutesStr + ":");
    }
    if (secondsStr !== "00") {
      duration.push(secondsStr);
    }
    // duration.push("." + millisecondsStr);

    return duration.join("");

    // Return the duration string
    return `${hoursStr}:${minutesStr}:${secondsStr}.${millisecondsStr}`;
  },
  dateToISOLikeButLocal(date: any) {
    const offsetMs = date.getTimezoneOffset() * 60 * 1000;
    const msLocal = date.getTime() - offsetMs;
    const dateLocal = new Date(msLocal);
    const iso = dateLocal.toISOString();
    const isoLocal = iso.slice(0, 19);
    return isoLocal;
  },
  diffBtwDt(start: string, finish: string) {
    const diff = new Date(finish).getTime() - new Date(start).getTime();
    return this.millisecondsToDuration(diff);
  },
  convertDateToDaysAgo(start: string) {
    const setDate = new Date(start);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate.getTime() - setDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 1;
    return `${diffDays} days ago`;
  },
  prettyDateTime(datetimeString: any) {
    // Create a Date object from the datetime string
    const date = new Date(datetimeString);
    return date.toLocaleString();
  },
};
