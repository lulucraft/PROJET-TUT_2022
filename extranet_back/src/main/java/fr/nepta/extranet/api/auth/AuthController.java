package fr.nepta.extranet.api.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.nepta.extranet.model.User;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200/", maxAge = 3600)
@RestController
@RequestMapping("api/auth/")
public class AuthController {

	@PostMapping(value = "refreshtoken", produces = "application/json")//consumes = "application/json", 
	public ResponseEntity<String> authenticateUser(@RequestBody User user) {
		System.err.println(user.getUsername());
		System.err.println(user.getPassword());

		return ResponseEntity.ok().body("test");
	}

//	@PostMapping(value = "login", consumes = "application/json", produces = "application/json")
//	public ResponseEntity<String> authenticateUser(@RequestBody User user) {
//		System.err.println(user.getUsername());
//		System.err.println(user.getPassword());
//
//		return ResponseEntity.ok().body("test");
//	}

}
