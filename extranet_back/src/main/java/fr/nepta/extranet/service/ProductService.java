package fr.nepta.extranet.service;

import fr.nepta.extranet.model.Product;

public interface ProductService {

	Product saveProduct(Product product);

	Product getProduct(String productName);

}
