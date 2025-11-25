export const phoneNumberReg =
	/^(05[4-9]\d{7}|06[5-7]\d{7}|069\d{7}|07[7-9]\d{7})$/;

export const isMobile = () => {
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
		navigator.userAgent,
	);
};

export const isPhoneNumber = (text) => {
	const cleanedText = text.replace(/\s+/g, "");
	return !!phoneNumberReg.test(cleanedText);
};

/**
 * Checks whether the provided text is a valid email address.
 *
 * This uses a fairly permissive regex that covers most common
 * email formats without being overly strict. It will reject
 * obviously invalid strings but may accept some edge‑case addresses
 * that are technically allowed by RFC 5322.
 */
export const isEmailValid = (email: string): boolean => {
	const cleanedEmail = email.trim();
	const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailReg.test(cleanedEmail);
};
