package fr.nepta.extranet.api.user;

import java.util.Collection;
import java.util.Date;

import javax.annotation.security.RolesAllowed;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import fr.nepta.extranet.model.Conge;
import fr.nepta.extranet.service.UserService;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200/", maxAge = 3600)
@RestController
@RequestMapping("api/user/")
public class UserController {

	@Autowired
	private final UserService us;

//	@GetMapping(value = "users")
//	public String getUsers() {
//		return us.getUsers().toString();
//	}

	@RolesAllowed({"USER","ADMIN"})
	@GetMapping(value = "congesacquis")
	public double getCongesAcquis(@RequestParam String username) {
		return us.getUser(username).getCongesNbr();
	}

	@RolesAllowed({"USER","ADMIN"})
	@GetMapping(value = "conges")
	public Collection<Conge> getConges(@RequestParam String username) {
		return us.getUser(username).getConges();
	}

	@RolesAllowed("USER")
	@PostMapping(value = "congesrequest", consumes = "application/json")
	public void congesRequest(@RequestBody Conge conge) {
		conge.setCreationDate(new Date());
		// Avoid bypass of admin validation
		conge.setValidated(false);

		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		// Add conges request from username of authenticated user
		us.addCongeToUser(us.getUser(auth.getName()), conge);
	}

	@RolesAllowed("USER")
	@PostMapping(value = "deletecongesrequest", consumes = "application/json")
	public String deleteCongesRequest(@RequestBody long congeId) throws Exception {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		us.deleteCongeFromUser(us.getUser(auth.getName()), congeId);
		return JSONObject.quote("La demande de congés a été supprimée");
	}

}
