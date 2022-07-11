package fr.nepta.extranet.api.auth;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.nepta.extranet.model.User;
import fr.nepta.extranet.service.UserService;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200/", maxAge = 3600)
@RestController
@RequestMapping("api/auth/")
public class RegistrationController {

	private final UserService userService;

	@PostMapping(value = "register", consumes = "application/json", produces = "application/json")
	public String register(@RequestBody User user) {
		if (user.getUsername() == null) {
			return "Nom d'utilisateur manquant";
		}

		if (user.getPassword() == null) {
			return "Mot de passe manquant";
		}

		userService.saveUser(user);
		return "ok";
	}
}
