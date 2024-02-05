export  function date_format(inp_date){
    /**
     [Форматирует дату к формату dd mm yyyy]
    */
    if (!inp_date) {
        return
    }
    const date = new Date(inp_date)
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1)
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${day} ${month} ${year} `
}


export function date_validator(inp_date){
    let diff = ( new Date() - new Date(inp_date)) / (60 * 60 * 24 * 1000)
    if(diff > 0){
        alert("Выбирите дату из будущего")
        return false
    }
    return true
}

export function is_authenticated(status) {
    if (status === 401) {
        return false
    }
    return true
}
