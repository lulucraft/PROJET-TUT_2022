package fr.nepta.extranet.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import fr.nepta.extranet.model.User;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {

	User findByUsername(String username);

//	@Query("SELECT username FROM user u LEFT JOIN order o ON u.order_id = o.order_id")
	User findByOrdersId(String orderId);

}
