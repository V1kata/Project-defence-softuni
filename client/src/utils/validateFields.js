export function validateFields(data) {
    for (let value in data) {
        if (!data[value]) {
            throw new Error('Please fill all fields!');
        }
    }
}

export function validateRegisterPasswords(value) {
    if (value.password !== value.rePass) {
        throw new Error('Passwrod missmatch')
    }
}