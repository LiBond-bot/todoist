export const dateConversion = ((date:Date) =>{

    const createDate = new Date(date);

    let day;
    let month;
    let hours;
    let minutes;
    const year = createDate.getFullYear();

    createDate.getDate() <= 9 ? day = '0' + createDate.getDate() : day = createDate.getDate();
    createDate.getMonth() <= 9 ? month = '0' + createDate.getDate() : month = createDate.getMonth();
    createDate.getHours() <= 9 ? hours = '0' + createDate.getHours() : hours = createDate.getHours();
    createDate.getMinutes() <= 9 ? minutes = '0' + createDate.getMinutes() : minutes = createDate.getMinutes();

    const convert_date = day + '.' + month  + '.' +  year + ' ' + hours + ':' + minutes;
    return convert_date;
    
})