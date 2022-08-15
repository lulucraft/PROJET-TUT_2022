package fr.nepta.extranet.api.user;

import javax.annotation.security.RolesAllowed;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.nepta.extranet.model.Order;
import fr.nepta.extranet.service.OrderService;
import fr.nepta.extranet.service.UserService;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200/", maxAge = 3600)
@RestController
@RequestMapping("api/user/")
public class UserController {

	@Autowired
	private final UserService us;
	@Autowired
	private final OrderService os;

	//	@GetMapping(value = "users")
	//	public String getUsers() {
	//		return us.getUsers().toString();
	//	}

	@RolesAllowed("USER")
	@PostMapping(value = "sendorder", consumes = "application/json")
	public void sendOrder(@RequestBody Order order) {
		// Order already exists
		if (os.getOrder(order.getOrderId()) != null) {
			return;
		}

		os.saveOrder(order);

//		// Avoid bypass of admin validation
//		conge.setValidated(false);

		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		// Add order to authenticated user from its username
		us.addOrderToUser(us.getUser(auth.getName()), order);
	}

//	@RolesAllowed("USER")
//	@PostMapping(value = "deletecongesrequest", consumes = "application/json")
//	public String deleteCongesRequest(@RequestBody long congeId) throws Exception {
//		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//		us.deleteCongeFromUser(us.getUser(auth.getName()), congeId);
//		return JSONObject.quote("La demande de congés a été supprimée");
//	}

//	@RolesAllowed({"USER","ADMIN"})
//	@GetMapping(value = "newusers")
//	public Collection<User> getNewUsers() {
//		List<User> users = new ArrayList<>();
//		Calendar currentCal = Calendar.getInstance();
//		Calendar cal = Calendar.getInstance();
//
//		// Get users registered this year
//		us.getUsers().stream().forEach(u -> {
//			cal.setTime(u.getCreationDate());
//			boolean isNewUser = ((currentCal.get(Calendar.YEAR) - cal.get(Calendar.YEAR)) <= 1);
//			if (isNewUser) {
//				// Avoid sending password, ...
//				User us = new User(u.getId(), null, null, null, u.getUsername(), null, u.getCreationDate(), 0, null, null);
//				users.add(us);
//			}
//		});
//
//		return users;
//	}

//	@GetMapping(value = "newsletters")
//	public Collection<Newsletter> getNewsletters() {
//		return ns.getNewsletters();
//	}
//
//	@GetMapping(value = "newsletter")
//	public Newsletter getNewsletter(@RequestParam String newsletterType) {
//		return ns.getNewsletter(newsletterType);
//	}

}
