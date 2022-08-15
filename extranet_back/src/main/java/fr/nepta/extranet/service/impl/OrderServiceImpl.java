package fr.nepta.extranet.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import fr.nepta.extranet.model.Order;
import fr.nepta.extranet.repository.OrderRepo;
import fr.nepta.extranet.service.OrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor @Slf4j
@Transactional
public class OrderServiceImpl implements OrderService {

	private final OrderRepo orderRepo;

	@Override
	public Order saveOrder(Order order) {
		log.info("Saving new order in the database");
		return orderRepo.save(order);
	}

	@Override
	public Order getOrder(String orderId) {
		log.info("Fetching order '{}'", orderId);
		return orderRepo.findByOrderId(orderId);
	}

}
