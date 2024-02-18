import axios from "axios"
import { check_user_exists } from "./components/registration/request";

export function date_format(inp_date) {
    /**
     [Форматирует дату к формату dd mm yyyy]
    */
    if (!inp_date) {
        return
    }
    const date = new Date(inp_date)
    const year = date.getUTCFullYear();
    let month = String(date.getUTCMonth() + 1)
    let day = String(date.getUTCDate()).padStart(2, '0');
    if (month < 10) {
        month = `0${month}`
    }
    return `${day} ${month} ${year} `
}

export function time_delay(inp_date) {
    const deadline = new Date(inp_date)
    const today = new Date()
    let delay = deadline - today;
    delay = Math.ceil(delay / (1000 * 60 * 60 * 24))
    //const deay = (deadline - today) % 10
    const division_remainder = delay % 10
    switch (true) {
        case (division_remainder === 1):
            return ` через ${delay} день`
        case (division_remainder < 5 && ( delay > 20 || delay < 10)):
            return `через ${delay} дня`
        case (division_remainder > 5):
            return `через ${delay} дней`

        case  (delay > 9 && delay < 21):
            return `через ${delay} дней`
        default:
            break
    }
}

export function date_validator(inp_date){
    let diff = ( new Date() - new Date(inp_date)) / (60 * 60 * 24 * 1000)
    if(diff > 0){
        alert("Выбирите дату из будущего")
        return false
    }
    return true
}

class Validator {
    constructor() {
        this.valdators = {}
    }

    is_valid() {
  
        for (var key in this.valdators) {
            console.log(key)
            if (this.valdators[key] === false) {
                return false
            }
        }
        return true
    }

    register_validators(validators) {
        this.valdators = validators
    }
    get_Validators() {
        return this.valdators
    }

    validate_password(password, max = 0, min = 0) {
        if (password.length < min) {
            return false
        }
        return true
    }
    validate_username(username) {
        const pattern = /^[\w.-]+@[\w.-]+\.\w+$/;
        if (pattern.test(username)) {
            return true
        } else {
            return false
        }
    }
    validate_repeat_password(password, password_repeat) {
        if (password === password_repeat) {
            return true
        } else {
            return false
        }
    }
    async validate_username_not_exists(username) {
        const is_user_exists = await check_user_exists(username)
        

        if (is_user_exists) {
            return false
        }
        return true
    }
}


export default Validator

