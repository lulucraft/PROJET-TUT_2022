package fr.nepta.extranet.service;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.util.Collection;

import javax.naming.AuthenticationException;

import fr.nepta.extranet.model.Product;

public class PayPalService {

	public static Collection<Product> getOrderProducts() throws IOException, AuthenticationException {
		getAuthorizations(null);
		return null;
	}

	private static String getToken() throws IOException {
		// Post request to get token
		String urlStr = "https://api.sandbox.paypal.com/v1/oauth2/token";
		String data = "grant_type=client_credentials";
		URL url = new URL(urlStr);
		URLConnection conn = url.openConnection();
		HttpURLConnection http = (HttpURLConnection) conn;

		http.setRequestMethod("POST");
		http.setRequestProperty("Accept", "application/json");
		// conn.setRequestProperty("Accept-Language", "en_US");
		// Authorization: Basic <client_id:secret in base64>
		http.setRequestProperty("Authorization", "Basic " + "QWFEX2VBckwzbEltU3NVbTZFUHFDMVhQaFM2VFoxd2tOdDdERWFtTzhsVVVKdzl4UTFnZi1fcXZXNGlBZUZ1M1Zac0pSNjEtTk41UW8xQUY6RUZBY0VwaElZQkVkTjRKVzZzUHFnQVpnX3p5UElEejhpOXh4WDlzamRGSGhrVVlMQ21RQnBLWVJWZWR3X2t0OGpjaXhfMFRRSVVCLWdvZzI");
		http.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
		http.setDoOutput(true);

		// Set data in request body
		http.getOutputStream().write(data.getBytes());
		http.getOutputStream().flush();
		http.getOutputStream().close();

		// Get response from server
		int responseCode = http.getResponseCode();
		System.out.println("Response Code : " + responseCode);
		if (responseCode == HttpURLConnection.HTTP_OK) {
			System.out.println(http.getResponseMessage());
			System.out.println("OK");
			return http.getResponseMessage();
		} else {
			System.out.println("NOT OK");
		}

		return null;
	}

	private static void getAuthorizations(String orderId) throws IOException, AuthenticationException {
		String access_token = getToken();
		if (access_token == null) {
			throw new AuthenticationException("Erreur lors de la récupération de l'access_token PayPal");
		}

		// Post to PayPal to get a token
		// Use the token to get an authorization
		URL url = new URL("https://api-m.sandbox.paypal.com/v2/payments/authorizations/" + orderId);
		URLConnection conn = url.openConnection();
		HttpURLConnection http = (HttpURLConnection) conn;
		http.setRequestMethod("GET");
		http.setRequestProperty("Content-Type", "application/json");
		// 'QWFEX2VBckwzbEltU3NVbTZFUHFDMVhQaFM2VFo...' == 'client_id:secret' (paypal) in base64
		http.setRequestProperty("Authorization", "Basic " + access_token);

		System.out.println(http.getResponseMessage());
	}
}
