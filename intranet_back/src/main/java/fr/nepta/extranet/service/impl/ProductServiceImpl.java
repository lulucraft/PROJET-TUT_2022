package fr.nepta.extranet.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import fr.nepta.extranet.model.Product;
import fr.nepta.extranet.repository.ProductRepo;
import fr.nepta.extranet.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor @Slf4j
@Transactional
public class ProductServiceImpl implements ProductService {

	private final ProductRepo productRepo;

	@Override
	public Product saveProduct(Product product) {
		log.info("Saving new product in the database");
		return productRepo.save(product);
	}

	@Override
	public Product getProduct(String productName) {
		log.info("Fetching product '{}'", productName);
		return productRepo.findByName(productName);
	}

}
