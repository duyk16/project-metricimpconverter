/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {

    this.getNum = function (input) {
        let result
        let numeralString = ''
        let charRegex = /[a-z]+$/i
        let indexOfChar = input.search(charRegex)
        if (indexOfChar >= 0) {
            numeralString += input.slice(0, indexOfChar)
        } else {
            numeralString += input
        }

        let numRegex = /^([0-9]+(\.[0-9]+)?)(\/([0-9]+\.[0-9]+|[1-9]+))?$/
        let found = numRegex.exec(numeralString)
        if (found !== null) {
            let a = Number(found[1])
            let b = found[4] ? Number(found[4]) : 1
            result = a / b
        } else {
            let nonRegex = /[^0-9]+/
            if (nonRegex.test(numeralString)) { result = NaN }
            else { result = 1 }
        }
        if (isNaN(result)) return 'invalid number'
        return Number(result.toFixed(5))
    }

    this.getUnit = function (input) {
        let result
        let charRegex = /[a-z]+$/i
        let charString = ''
        let indexOfChar = input.search(charRegex)
        if (indexOfChar >= 0) {
            charString += input.slice(indexOfChar)
        } else {
            result = 'invalid unit'
        }

        let unitRegex = /^(gal|l|mi|km|lbs|kg)$/i
        let found = unitRegex.exec(charString)
        result = found ? found[1] : 'invalid unit'

        return result.toLowerCase()
    }

    this.getReturnUnit = function (initUnit) {
        switch (initUnit.toLowerCase()) {
            case 'gal':
                return 'l'
            case 'l':
                return 'gal'
            case 'mi':
                return 'km'
            case 'km':
                return 'mi'
            case 'lbs':
                return 'kg'
            case 'kg':
                return 'lbs'
            default:
                return 'invalid unit'
        }
    }

    this.spellOutUnit = function (unit) {
        switch (unit.toLowerCase()) {
            case 'gal':
                return 'gallons'
            case 'l':
                return 'liters'
            case 'mi':
                return 'miles'
            case 'km':
                return 'kilometers'
            case 'lbs':
                return 'pounds'
            case 'kg':
                return 'kilograms'
            default:
                return 'invalid unit'
        }
    }

    this.convert = function (initNum, initUnit) {
        const galToL = 3.78541
        const lbsToKg = 0.453592
        const miToKm = 1.60934
        let result = Number(initNum)

        switch (initUnit.toLowerCase()) {
            case 'gal':
                result *= galToL
                break
            case 'l':
                result /= galToL
                break
            case 'lbs':
                result *= lbsToKg
                break
            case 'kg':
                result /= lbsToKg
                break
            case 'mi':
                result *= miToKm
                break
            case 'km':
                result /= miToKm
                break
            default:
                result = NaN
        }
        if (isNaN(result)) return 'invalid number'

        return Number(result.toFixed(5))
    }

    this.getString = function (initNum, initUnit, returnNum, returnUnit) {
        if (initNum === 'invalid number' && initUnit === 'invalid unit') return 'invalid number and unit'
        if (initNum === 'invalid number') return 'invalid number'
        if (initUnit === 'invalid unit') return 'invalid unit'

        return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`
    }

}

module.exports = ConvertHandler
