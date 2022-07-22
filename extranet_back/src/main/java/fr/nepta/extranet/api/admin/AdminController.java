package fr.nepta.extranet.api.admin;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.security.RolesAllowed;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.nepta.extranet.model.Conge;
import fr.nepta.extranet.model.User;
import fr.nepta.extranet.service.CongeService;
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
	private final CongeService cs;

	@RolesAllowed("ADMIN")
	@GetMapping(value = "users")
	public String getUsers() {
		return us.getUsers().toString();
	}

	@RolesAllowed("ADMIN")
	@GetMapping(value = "conges")
	public Map<String, Collection<Conge>> getAllConges() {
		Map<String, Collection<Conge>> conges = new HashMap<>();
		for (User u : us.getUsers()) {
			if (u.getRoles().contains(rs.getRole("USER"))) {
				conges.put(u.getUsername(), u.getConges());
			}
		}
		return conges;
	}

	@RolesAllowed("ADMIN")
	@PostMapping(value = "validateconge")
	public String validateConge(@RequestBody Conge conge) {
//		Conge conge = cs.getConge(congeId);
		cs.validateConge(conge);
		return "";
	}

}
