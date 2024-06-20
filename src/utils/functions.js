
export const dateConversion = (time) => {
    const timestamp = Number(time) * 1000; 

    const date = new Date(timestamp);

    const options = { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric', 
        hour: 'numeric', 
        minute: 'numeric', 
        hour12: true 
    };

    return date.toLocaleString('en-US', options).split(" at ");
};

export const formatDateTimeLocal = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp * 1000); 
  
    const pad = (num) => (num < 10 ? "0" + num : num);
  
    const dateString = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  
    return dateString;
};

export const dateTimeLocalToTimestamp = (dateTimeLocal) => {
    const date = new Date(dateTimeLocal);
  
    const timestamp = Math.floor(date.getTime() / 1000);
  
    return timestamp;
}

export const convertToDMY = (dateStr) => {
    const date = new Date(dateStr);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}
