package fr.nepta.extranet.service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;
import java.util.ArrayList;
import java.util.Collection;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONArray;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.stereotype.Component;

import fr.nepta.extranet.model.Product;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Component
public class PayPalService {

	private static ProductService ps;

	@Autowired
	private ProductService productService;

	//	static {
	//		ps = ApplicationContext.getBean(ProductService.class);
	//	}

	@PostConstruct
	public void init() {
		ps = productService;
	}

	public static Collection<Product> getOrderProducts(String orderId) throws IOException, InterruptedException {
		JSONObject checkoutOrders = getCheckoutOrders(orderId);

		if (checkoutOrders == null) return null;

		System.out.println(checkoutOrders);
		System.out.println(checkoutOrders.toString());
		//		System.out.println(checkoutOrders.length());

		//		ObjectMapper om = new ObjectMapper();
		//		//om.activateDefaultTyping(new DefaultBaseTypeLimitingValidator());
		//		om.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
		//		System.err.println(om.readValue(checkoutOrders.toString(), PurshaseUnits.class).items);

		// Get purshase_units of order
		JSONObject pu;
		try {
			pu = checkoutOrders.getJSONArray("purchase_units").getJSONObject(0);
		} catch (JSONException e) {
			log.error("Impossible to get purchase_units of order '{}'", orderId);
			e.printStackTrace();
			return null;
		}

		// Get purshase_units items
		JSONArray items;
		try {
			items = pu.getJSONArray("items");
		} catch (JSONException e) {
			log.error("Impossible to get items of purshase_units of order '{}'", orderId);
			e.printStackTrace();
			return null;
		}

		Collection<Product> products = new ArrayList<>();

		// Get purshase_units items and convert to product
		for (int i = 0; i < items.length(); i++) {
			try {
				JSONObject jsonProduct = items.getJSONObject(i);
				Product p = ps.getProduct(jsonProduct.getString("name"));
				if (p != null) {
					products.add(p);					
				}
			} catch (JSONException e) {
				log.error("Impossible to get item '{}' of purshase_units items of order '{}'", i, orderId);
				e.printStackTrace();
			}
		}

		return products;
	}

	private static String getToken() throws IOException, InterruptedException {
		// POST request to get token
		String urlStr = "https://api.sandbox.paypal.com/v1/oauth2/token";
		String data = "grant_type=client_credentials";

		HttpRequest request = HttpRequest.newBuilder(URI.create(urlStr))
				.setHeader("Accept", "application/json")
				.setHeader("Authorization", "Basic " + "QWFEX2VBckwzbEltU3NVbTZFUHFDMVhQaFM2VFoxd2tOdDdERWFtTzhsVVVKdzl4UTFnZi1fcXZXNGlBZUZ1M1Zac0pSNjEtTk41UW8xQUY6RUZBY0VwaElZQkVkTjRKVzZzUHFnQVpnX3p5UElEejhpOXh4WDlzamRGSGhrVVlMQ21RQnBLWVJWZWR3X2t0OGpjaXhfMFRRSVVCLWdvZzI")
				.setHeader("Content-Type", "application/x-www-form-urlencoded")
				.POST(HttpRequest.BodyPublishers.ofString(data))
				.build();

		HttpClient client = HttpClient.newBuilder().build();
		HttpResponse<?> response = client.send(request, BodyHandlers.ofString());

		JSONObject jsonResponse = null;
		try {
			jsonResponse = new JSONObject(response.body().toString());
			//System.out.println(jsonResponse);
			return jsonResponse.getString("access_token");
		} catch (JSONException e) {
			log.error("PayPal access_token request failed");
			e.printStackTrace();
		}

		//		URL url = new URL(urlStr);
		//		URLConnection conn = url.openConnection();
		//		HttpURLConnection http = (HttpURLConnection) conn;
		//
		//		http.setRequestMethod("POST");
		//		http.setRequestProperty("Accept", "application/json");
		//		// conn.setRequestProperty("Accept-Language", "en_US");
		//		// Authorization: Basic <client_id:secret in base64>
		//		http.setRequestProperty("Authorization", "Basic " + "QWFEX2VBckwzbEltU3NVbTZFUHFDMVhQaFM2VFoxd2tOdDdERWFtTzhsVVVKdzl4UTFnZi1fcXZXNGlBZUZ1M1Zac0pSNjEtTk41UW8xQUY6RUZBY0VwaElZQkVkTjRKVzZzUHFnQVpnX3p5UElEejhpOXh4WDlzamRGSGhrVVlMQ21RQnBLWVJWZWR3X2t0OGpjaXhfMFRRSVVCLWdvZzI");
		//		http.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
		//		http.setDoOutput(true);
		//
		//		// Set data in request body
		//		http.getOutputStream().write(data.getBytes());
		//		http.getOutputStream().flush();
		//		http.getOutputStream().close();
		//
		//		// Get response from server
		//		int responseCode = http.getResponseCode();
		//		//System.out.println("Response Code : " + responseCode);
		//		if (responseCode == HttpURLConnection.HTTP_OK) {
		//			System.out.println(http.getResponseMessage());
		//			System.out.println("OK");
		//			return http.getResponseMessage();
		//		} else {
		//			System.out.println("NOT OK");
		//		}

		return null;
	}

	private static JSONObject getCheckoutOrders(String orderId) throws IOException, InterruptedException {
		// GET PayPal access_token
		String access_token = getToken();

		if (access_token == null) {
			return null;
			//throw new AuthenticationException("Erreur lors de la recuperation de l'access_token PayPal");
		}

		String urlStr = "https://api-m.sandbox.paypal.com/v2/checkout/orders/" + orderId;

		// Use the token to get payments authorizations
		HttpRequest request = HttpRequest.newBuilder(URI.create(urlStr))
				.setHeader("Authorization", "Bearer " + access_token)
				.setHeader("Content-Type", "application/json")
				.GET()
				.build();

		HttpClient client = HttpClient.newBuilder().build();
		HttpResponse<?> response = client.send(request, BodyHandlers.ofString());

		JSONObject jsonResponse = null;
		try {
			jsonResponse = new JSONObject(response.body().toString());
		} catch (JSONException e) {
			log.error("Authorizations request failed for order '{}'", orderId);
			e.printStackTrace();
		}

		return jsonResponse;

		//		URL url = new URL("https://api-m.sandbox.paypal.com/v2/payments/authorizations/" + orderId);
		//		URLConnection conn = url.openConnection();
		//		HttpURLConnection http = (HttpURLConnection) conn;
		//		http.setRequestMethod("GET");
		//		http.setRequestProperty("Content-Type", "application/json");
		//		// 'QWFEX2VBckwzbEltU3NVbTZFUHFDMVhQaFM2VFo...' == 'client_id:secret' (paypal) in base64
		//		http.setRequestProperty("Authorization", "Basic " + access_token);

		//		return http.getResponseMessage();
	}

	//	private static class PurshaseUnits {
	//		public Collection<Items> items;
	//	}
	//
	//	private static class Items {
	//		public String name;
	//		public int quantity;
	//	}
}
