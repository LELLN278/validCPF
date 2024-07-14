function ValidateCPF(cpfSent) {
    Object.defineProperty(this, 'cpfClean', {
        enumarable: true,
        get: function(){
            return cpfSent.replace(/\D+/g, '')
        }
    });
};

ValidateCPF.prototype.valid = function(){
    if (this.cpfClean.length !== 11) return false;
    if (typeof this.cpfClean === 'undefined') return false;
    if (this.isSequence()) return false;

    const cpfPartial = this.cpfClean.slice(0, -2);

    const digit1 = this.createDigit(cpfPartial);
    const digit2 = this.createDigit(cpfPartial + digit1);

    const newCpf = cpfPartial + digit1 + digit2;

    return newCpf === this.cpfClean;
};

ValidateCPF.prototype.isSequence = function(){
    const sequence = this.cpfClean[0].repeat(11);
    return sequence === this.cpfClean;
};

ValidateCPF.prototype.createDigit = function(cpfPartial){
    const cpfArray = Array.from(cpfPartial);
    let regress = cpfArray.length + 1;
    let result = cpfArray.reduce((ac, val)=>{
        ac += (regress * Number(val));
        regress--;
        return ac;
    },0);

    const digit = 11 - (result % 11);
    return digit > 9 ? '0' : String(digit);
    
};

