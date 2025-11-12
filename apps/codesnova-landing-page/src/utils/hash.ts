export function GenerateHash(length: number): string {
	if (!Number.isInteger(length) || length < 1)
		throw new Error("Length must be a positive integer");
	const tsPrefix = Date.now().toString(36).toUpperCase();
	const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	const alphabetLength = alphabet.length;
	const buffer = new Uint32Array(length);
	crypto.getRandomValues(buffer);

	let randomPart = "";
	for (let i = 0; i < length; i++) {
		const idx = buffer[i] % alphabetLength;
		randomPart += alphabet[idx];
	}

	return tsPrefix + randomPart;
}

/**
 * Génère un code de référence sécurisé, court et lisible par l'homme.
 * Utilise un alphabet sans caractères ambigus (O, 0, I, 1, L).
 * @param length La longueur totale du code à générer (par exemple, 6).
 * @returns Un code formaté en blocs pour une lecture facile (ex: ABC-DEF).
 */
export function GenerateReadableRef(length: number = 6): string {
	if (!Number.isInteger(length) || length < 1) {
		throw new Error("Length must be a positive integer");
	}

	// Alphabet "humainement sûr" : exclut 0, O, 1, I, L pour éviter la confusion.
	const alphabet = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
	const alphabetLength = alphabet.length;

	let result = "";
	// Utilise crypto.getRandomValues pour une meilleure sécurité que Math.random()
	const randomValues = crypto.getRandomValues(new Uint32Array(length));

	for (let i = 0; i < length; i++) {
		result += alphabet[randomValues[i] % alphabetLength];
	}

	// Formate le code pour une lisibilité maximale.
	// Pour 6 caractères -> XXX-XXX
	// Pour 8 caractères -> XXXX-XXXX
	const mid = Math.ceil(length / 2);
	return `${result.substring(0, mid)}-${result.substring(mid)}`;
}
