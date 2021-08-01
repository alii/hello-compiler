export enum Tokens {
	NAME,
	ASSIGNMENT,
	NUMBER,
}

export interface Token {
	type: Tokens;
	value: string;
}

function tokenizeLine(contents: string, line: number) {
	const tokens: Token[] = [];
	let cursor = 0;

	while (cursor < contents.length) {
		let char = contents[cursor];

		if (char === "/") {
			const peek = contents[cursor + 1];

			if (peek === "/") {
				return tokens;
			}
		}

		if (char === "=") {
			const peek = contents[cursor + 1];

			switch (true) {
				case peek === "=": {
					// evaluation
					break;
				}

				default: {
					tokens.push({
						type: Tokens.ASSIGNMENT,
						value: "=",
					});

					cursor++;
					continue;
				}
			}
		}

		if (/\s/.test(char)) {
			cursor++;
			continue;
		}

		const NUMBERS = /[0-9]/;
		if (NUMBERS.test(char)) {
			let value = "";

			while (NUMBERS.test(char)) {
				value += char;
				char = contents[++cursor];
			}

			tokens.push({
				type: Tokens.NUMBER,
				value,
			});

			continue;
		}

		const letters = /[a-z]/i;
		if (letters.test(char)) {
			let value = "";

			while (letters.test(char)) {
				value += char;
				char = contents[++cursor];
			}

			tokens.push({
				type: Tokens.NAME,
				value,
			});

			continue;
		}

		throw new TypeError(`stupid baka syntax error at ${char} on line ${line}`);
	}

	return tokens;
}

export function parse(file: string) {
	const lines = file.split("\n");

	const tokens: Token[] = [];

	for (let line = 1; line <= lines.length; line++) {
		const contents = lines[line - 1];
		tokens.push(...tokenizeLine(contents, line));
	}

	return tokens;
}
