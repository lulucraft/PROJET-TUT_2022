package fr.nepta.extranet.service;

import java.util.List;

import fr.nepta.extranet.model.Product;

public interface ProductService {

	Product saveProduct(Product product);

	Product getProduct(String productName);

	List<Product> getProducts();

	Product getProduct(long productId);

}
