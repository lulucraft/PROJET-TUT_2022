package fr.nepta.extranet;

import java.util.ArrayList;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import fr.nepta.extranet.model.Conge;
import fr.nepta.extranet.model.Role;
import fr.nepta.extranet.model.User;
import fr.nepta.extranet.service.RoleService;
import fr.nepta.extranet.service.UserService;

@SpringBootApplication
@EnableJpaRepositories
public class ExtranetApplication {

	public static final String SECRET = "E)H@McQfTjWnZr4u7x!A%D*F-JaNdRgU";

	public static void main(String[] args) {
		SpringApplication.run(ExtranetApplication.class, args);
	}

	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	CommandLineRunner run(UserService us, RoleService rs) {
		return args -> {
			if (rs.getRole("USER") == null) {
				rs.saveRole(new Role(null, "USER"));
			}
			if (rs.getRole("ADMIN") == null) {
				rs.saveRole(new Role(null, "ADMIN"));
			}

			if (us.getUser("admin") == null) {
				us.saveUser(new User(null, null, null, "admin@gmail.com", "admin", "root", new ArrayList<Role>(), 0, new ArrayList<Conge>()));
			}
			if (!us.getUser("admin").getRoles().contains(rs.getRole("ADMIN"))) {
				us.addRoleToUser("admin", "ADMIN");
			}
		};
	}

}
