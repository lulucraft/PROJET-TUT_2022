package fr.nepta.extranet.api.admin;

import javax.annotation.security.RolesAllowed;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.nepta.extranet.model.Newsletter;
import fr.nepta.extranet.service.NewsletterService;
import fr.nepta.extranet.service.RoleService;
import fr.nepta.extranet.service.UserService;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200/", maxAge = 3600)
@RestController
@RequestMapping("api/admin/")
public class AdminController {

	@Autowired
	private final UserService us;
	@Autowired
	private final RoleService rs;
	@Autowired
	private final NewsletterService ns;

	@RolesAllowed("ADMIN")
	@GetMapping(value = "users")
	public String getUsers() {
		return us.getUsers().toString();
	}

	@RolesAllowed("ADMIN")
	@PostMapping(value = "editnewsletter")
	public void editNewsletter(@RequestBody Newsletter newsletter) {
		Newsletter nl = ns.getNewsletter(newsletter.getType());
		if (nl != null) {
			newsletter.setId(nl.getId());
		}
		ns.saveNewsletter(newsletter);
	}

}
