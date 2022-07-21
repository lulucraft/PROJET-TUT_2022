package fr.nepta.extranet.service.impl;

import java.util.Collection;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import fr.nepta.extranet.model.Conge;
import fr.nepta.extranet.model.User;
import fr.nepta.extranet.repository.CongeRepo;
import fr.nepta.extranet.service.CongeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor @Slf4j
@Transactional
public class CongeServiceImpl implements CongeService {

	private final CongeRepo congeRepo;

	@Override
	public Conge saveConge(Conge conge) {
		log.info("Saving new conge to the database");
		return congeRepo.save(conge);
	}

	@Override
	public Collection<Conge> getConges(User user) {
		log.info("Fetching conges of {} from database", user.getUsername());
		return user.getConges();
	}

//	@Override
//	public Conge getConge(String congeName) {
//		log.info("Fetching role '{}'", congeName);
//		return roleRepo.findByName(congeName);
//	}

}
