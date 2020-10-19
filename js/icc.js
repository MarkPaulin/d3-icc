function icc(ability, a, b, c) {
	return(c + (1 - c) * (1 / (1 + Math.exp(-a * (ability - b)))))
}
