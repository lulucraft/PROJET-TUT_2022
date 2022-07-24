package fr.nepta.extranet.api.auth;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;

import fr.nepta.extranet.ExtranetApplication;
import fr.nepta.extranet.model.Role;
import fr.nepta.extranet.model.User;
import fr.nepta.extranet.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RequiredArgsConstructor @Log4j2
@CrossOrigin(origins = "http://localhost:4200/", maxAge = 3600)
@RestController
@RequestMapping("api/auth/")
public class AuthController {

	private final UserService us;

	@GetMapping(value = "refreshtoken")//consumes = "application/json", 
	public void refreshToken(HttpServletRequest request, HttpServletResponse response) {
		String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
		if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
			try {
				String refreshToken = authorizationHeader.substring("Bearer ".length());
				Algorithm algo = Algorithm.HMAC256(ExtranetApplication.SECRET.getBytes());

				JWTVerifier verifier = JWT.require(algo).build();
				DecodedJWT dJWT = verifier.verify(refreshToken);

				String username = dJWT.getSubject();
				User user = us.getUser(username);

				String accessToken = JWT.create()
						.withSubject(user.getUsername())
						.withExpiresAt(new Date(System.currentTimeMillis() + 10 * 60 * 1000))
						.withIssuer(request.getRequestURI().toString())
						.withClaim("roles", user.getRoles().stream().map(Role::getName).collect(Collectors.toList()))
						.sign(algo);

				Map<String, String> tokens = new HashMap<>();
				tokens.put("accessToken", accessToken);
				tokens.put("refreshToken", refreshToken);

				response.setContentType(MediaType.APPLICATION_JSON_VALUE);
				new ObjectMapper().writeValue(response.getOutputStream(), tokens);

				log.info("Refresh token for user: {}", username);
			} catch(Exception e) {
				log.error("Refreshtoken error: {}", e.getMessage());
			}
		} else {
			throw new RuntimeException("Refresh token is missing");
		}
	}

	@PostMapping(value = "register", consumes = "application/json", produces = "application/json")
	public String register(@RequestBody User user) {
		if (user.getUsername() == null) {
			return "Nom d'utilisateur manquant";
		}

		if (user.getPassword() == null) {
			return "Mot de passe manquant";
		}

		boolean userExists = us.getUser(user.getUsername()) != null;
		if (userExists) {
			throw new IllegalStateException("Un compte est déjà associé à cet email");
		}

		// User creation date
		user.setCreationDate(new Date());

		us.saveUser(user);

		return "ok";
	}

//	@PostMapping(value = "login", consumes = "application/json", produces = "application/json")
//	public ResponseEntity<String> authenticateUser(@RequestBody User user) {
//		System.err.println(user.getUsername());
//		System.err.println(user.getPassword());
//
//		return ResponseEntity.ok().body("test");
//	}

}
