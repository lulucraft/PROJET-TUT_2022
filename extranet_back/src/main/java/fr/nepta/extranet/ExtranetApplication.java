package fr.nepta.extranet;

import java.util.ArrayList;
import java.util.Date;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import fr.nepta.extranet.model.Conge;
import fr.nepta.extranet.model.Newsletter;
import fr.nepta.extranet.model.Role;
import fr.nepta.extranet.model.User;
import fr.nepta.extranet.service.NewsletterService;
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
	CommandLineRunner run(UserService us, RoleService rs, NewsletterService ns) {
		return args -> {
			// ROLES
			if (rs.getRole("USER") == null) {
				rs.saveRole(new Role(null, "USER"));
			}
			if (rs.getRole("ADMIN") == null) {
				rs.saveRole(new Role(null, "ADMIN"));
			}

			if (us.getUser("admin") == null) {
				us.saveUser(new User(null, null, null, "admin@gmail.com", "admin", "root", new Date(), 0, new ArrayList<Role>(), new ArrayList<Conge>()));
			}
			if (!us.getUser("admin").getRoles().contains(rs.getRole("ADMIN"))) {
				us.addRoleToUser("admin", "ADMIN");
			}

			// NEWSLETTER
			if (ns.getNewsletter("INFOS") == null) {
				ns.saveNewsletter(new Newsletter(null, "Loi montagne", "Pour limiter les embouteillages sur les routes dans les régions montagneuses et améliorer la sécurité des usagers, il faudra équiper sa voiture de pneus hiver ou détenir des chaînes dans son coffre en période hivernale dans certaines communes. L'obligation entrera en vigueur au 1er novembre 2021. Quels sont les véhicules et les départements concernés ? Chaînes, pneus hiver, pneus cloutés ou à crampons, quels sont les équipements obligatoires ? Prise en application de la loi Montagne II du 28 décembre 2016, le décret est paru au Journal officiel le 18 octobre 2020.", "INFOS"));
			}
			if (ns.getNewsletter("SELLS") == null) {
				ns.saveNewsletter(new Newsletter(null, "Newsletter ventes", "0, 1", "SELLS"));
			}
		};
	}

}
