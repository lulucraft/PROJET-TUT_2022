package fr.nepta.extranet.api;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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

	@GetMapping(value = "users")
	public String getUsers() {
		return us.getUsers().toString();
	}

	@GetMapping(value = "congesacquis")
	public double getCongesAcquis(@RequestParam String username) {
		return us.getUser(username).getCongesNbr();
	}

	@GetMapping(value = "conges")
	public Collection<Conge> getConges(@RequestParam String username) {
		return us.getUser(username).getConges();
	}

}
