package fr.nepta.extranet.service;

import fr.nepta.extranet.model.Order;

public interface OrderService {

	Order saveOrder(Order order);

	Order getOrder(String orderId);

}
