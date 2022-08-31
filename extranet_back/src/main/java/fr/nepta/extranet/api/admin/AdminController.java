package fr.nepta.extranet.api.admin;

import javax.annotation.security.RolesAllowed;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import fr.nepta.extranet.model.Product;
import fr.nepta.extranet.model.Size;
import fr.nepta.extranet.service.ProductService;
import fr.nepta.extranet.service.SizeService;
import fr.nepta.extranet.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200/", maxAge = 3600)
@RestController
@RequestMapping("api/admin/")
public class AdminController {

	@Autowired
	private final UserService us;
	@Autowired
	private final ProductService ps;
	@Autowired
	private final SizeService ss;

	@RolesAllowed("ADMIN")
	@GetMapping(value = "users")
	public String getUsers() {
		return us.getUsers().toString();
	}

	@RolesAllowed("ADMIN")
	@PostMapping(value = "sendproduct", consumes = "application/json")
	public void sendProduct(@RequestBody Product product) {

		// Product already exists
		if (ps.getProduct(product.getName()) != null) {
			log.error("A product with name '{}' already exists", product.getName());
			return;
		}

		Size size = ss.getSize(product.getSize().getLabel());
		// Size not found
		if (size == null) {
			log.info("La taille '{}' n'existe pas. Ajout de celle-ci en base", product.getSize().getLabel());
			ss.saveSize(product.getSize());
		} else {
			product.setSize(size);
		}

		ps.saveProduct(product);
	}

	@RolesAllowed("ADMIN")
	@GetMapping(value = "product")
	public Product getProduct(@RequestParam long productId) {
		return ps.getProduct(productId);
	}

//	@RolesAllowed("ADMIN")
//	@PostMapping(value = "editnewsletter")
//	public void editNewsletter(@RequestBody Newsletter newsletter) {
//		Newsletter nl = ns.getNewsletter(newsletter.getType());
//		if (nl != null) {
//			newsletter.setId(nl.getId());
//		}
//		ns.saveNewsletter(newsletter);
//	}

}
