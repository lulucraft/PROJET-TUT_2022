package fr.nepta.extranet.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.nepta.extranet.model.Order;

public interface OrderRepo extends JpaRepository<Order, Long> {

	Order findById(String orderId);

}
