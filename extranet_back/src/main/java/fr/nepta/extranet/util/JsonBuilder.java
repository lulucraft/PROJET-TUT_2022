package fr.nepta.extranet.util;

import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;

public class JsonBuilder {

	private JSONObject jsonObj;

	public JsonBuilder() {
		this.jsonObj = new JSONObject();
	}

	public JSONObject addJsonElement(String key, String value) throws JSONException {
		return jsonObj.put(key, value);
	}

	@Override
	public String toString() {
		return this.jsonObj.toString();
	}

}
