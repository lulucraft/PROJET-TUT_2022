package fr.nepta.extranet.service;

import java.util.Collection;

import fr.nepta.extranet.model.Order;
import fr.nepta.extranet.model.UserOrder;

public interface OrderService {

	Order saveOrder(Order order);

	Order getOrder(String orderId);

	Collection<UserOrder> getOrders();

}
