package fr.nepta.extranet.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
@Log4j2
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	private final UserDetailsService userDetailsService;
	private final BCryptPasswordEncoder bCryptPasswordEncoder;

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//		auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder);
		auth.authenticationProvider(daoAuthenticationProvider());

//		String pass = passwordEncoder().encode("test");
//		System.err.println(pass);
//		auth.inMemoryAuthentication().withUser("admin").password(pass).roles("ADMIN");
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		AuthenticationFilter authFilter = new AuthenticationFilter(authenticationManagerBean());

		authFilter.setFilterProcessesUrl("/api/auth/login");

		http.cors();
		//http.authorizeHttpRequests().anyRequest().authenticated().and().formLogin();
//		http.csrf().ignoringAntMatchers("/api/auth/register", "/api/auth/login", "/api/auth/logout");//.disable();
		http.csrf().disable();
		//http.authorizeHttpRequests().anyRequest().permitAll();
		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

		// ALL
		http.authorizeHttpRequests().antMatchers("/api/auth/**").permitAll();

		// USER
		http.authorizeHttpRequests().antMatchers(HttpMethod.GET, "/api/users").hasAnyAuthority("USER");

		// ADMIN
		http.authorizeHttpRequests().antMatchers(HttpMethod.GET, "/api/admin/**").hasAnyAuthority("ADMIN");

		http.authorizeHttpRequests().anyRequest().authenticated()
		.and().logout().logoutUrl("/api/auth/logout").deleteCookies("JSESSIONID");

		http.addFilter(authFilter);
		http.addFilterBefore(new AuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);
	}

	@Bean
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

    @Bean
    DaoAuthenticationProvider daoAuthenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(bCryptPasswordEncoder);
        provider.setUserDetailsService(userDetailsService);
        return provider;
    }
}
