export interface IValidEqualPassword {
	validEqualPassword: boolean
}
export interface IValidUserMail {
	validUserMail: boolean
}

export interface IValidPasswordStrength {
	validPasswordStrength?: boolean,
	noUpperCase?: boolean,
	noLowerCase?: boolean,
	noNumeric?: boolean,
	notSymbols?: boolean
}
