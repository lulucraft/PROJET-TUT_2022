package fr.nepta.extranet.util;

public class AuthUtil {

	public static String generateToken(AuthMethod authMethod) {
		switch (authMethod) {
		case OAUTH2:
			return generateOAuth2Token();

		case JWT: {
			return generateJwtToken();
		}

		default:
			throw new IllegalArgumentException("Unexpected value: " + authMethod);
		}
	}

	private static String generateOAuth2Token() {
		//OAut
		return null;
	}

	private static String generateJwtToken() {
		//return Jwts.claims;
		return null;
	}
}
