export const stringify = rules => {
	const robots = []
	Object.keys(rules).forEach(userAgent => {
		const rulesets = rules[userAgent]
		robots.push(`User-agent: ${userAgent}`)

		Object.keys(rulesets).forEach(rule => {
			const paths = rulesets[rule]
			paths.forEach(path => {
				robots.push(`${rule.charAt(0).toUpperCase() + rule.slice(1)}: ${path}`)
			})
		})

		robots.push('')
	})

	return robots.join('\r\n')
}

export const parse = (rules, allowDuplicates = false) => {
	const robots = {}
	rules.forEach(rule => {
		const r = JSON.parse(rule)
		if (null === r.userAgent || null === r.directoryPath) {
			return
		}

		if (!robots[r.userAgent]) {
			robots[r.userAgent] = {
				allow    : [],
				disallow : []
			}
		}

		let duplicate = false
		robots[r.userAgent][r.rule].forEach(path => {
			if (path === r.directoryPath) {
				duplicate = true
			}
		})

		if (duplicate && !allowDuplicates) {
			return
		}

		robots[r.userAgent][r.rule].push(r.directoryPath)
	})

	return robots
}

export const mergeRules = (rules1, rules2, allowDuplicates = false, allowOverride = false) => {
	for (const userAgent in rules2) {
		if (!userAgent) {
			continue
		}

		if (!(userAgent in rules1)) {
			rules1[userAgent] = validateRules(rules2[userAgent], rules2[userAgent], allowDuplicates, allowOverride)
			continue
		}

		validateRules(rules1[userAgent], rules2[userAgent], allowDuplicates, allowOverride, true)

		const allow = [
			...rules1[userAgent].allow,
			...rules2[userAgent].allow
		]
		rules1[userAgent].allow = allowDuplicates ? allow : arrayUnique(allow)

		const disallow = [
			...rules1[userAgent].disallow,
			...rules2[userAgent].disallow
		]
		rules1[userAgent].disallow = allowDuplicates ? disallow : arrayUnique(disallow)
	}

	return rules1
}

const validateRules = (rules1, rules2, allowDuplicates, allowOverride, matchPattern = false) => {
	const validateRulesHelper = (directive, rules1, rules2, allowDuplicates, allowOverride, matchPattern = false) => {
		const otherDirective = ('allow' === directive) ? 'disallow' : 'allow'

		rules2[directive].forEach((path, index1) => {
			const index2 = rules1[otherDirective].indexOf(path)
			if (-1 !== index2) {
				if (allowOverride) {
					rules1[otherDirective].splice(index2, 1)
				} else if (!allowDuplicates) {
					rules2[directive].splice(index1, 1)
				}
			}

			if (matchPattern) {
				const pattern = '^' + path.replace(/./g, '\\.').replace(/\//g, '\\/').replace(/\*/g, '(.*)').replace(/\?/, '\\?') + '$'
				const matches = rules1.allow.some(p => p && p.match(pattern)) || rules1.disallow.some(p => p && p.match(pattern))
				if (matches) {
					if (!allowDuplicates) {
						rules2[directive].splice(index1, 1)
					}
				}
			}
		})
		return [ rules1, rules2 ]
	}

	// If we are allowing an override, let's do that now.
	[ rules1, rules2 ] = validateRulesHelper('disallow', rules1, rules2, allowDuplicates, allowOverride, matchPattern);
	[ rules1, rules2 ] = validateRulesHelper('allow', rules1, rules2, allowDuplicates, allowOverride, matchPattern)
	return rules1
}

const arrayUnique = array => {
	const a = array.concat()
	for (let i = 0; i < a.length; ++i) {
		for (let j = i + 1; j < a.length; ++j) {
			if (a[i] === a[j]) { a.splice(j--, 1) }
		}
	}

	return a
}