export const formatDate = (date: Date | null) => {
    if (!(date instanceof Date) || isNaN(date.getTime())) return ""; 
    
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
};