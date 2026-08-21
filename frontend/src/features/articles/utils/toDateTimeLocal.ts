
  export const toDateTimeLocal = (utcString?: string) => {
    if (!utcString) return "";

    const date = new Date(utcString);

    const pad = (n: number) => String(n).padStart(2, "0");

    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
      date.getDate(),
    )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  };
