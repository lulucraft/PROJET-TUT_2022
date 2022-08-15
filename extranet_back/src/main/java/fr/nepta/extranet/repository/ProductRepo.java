package fr.nepta.extranet.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import fr.nepta.extranet.model.Product;

@Repository
public interface ProductRepo extends JpaRepository<Product, Long> {

	Product findByName(String name);

}
