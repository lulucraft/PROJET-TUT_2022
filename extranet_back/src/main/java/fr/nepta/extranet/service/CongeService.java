package fr.nepta.extranet.service;

import java.util.Collection;

import fr.nepta.extranet.model.Conge;
import fr.nepta.extranet.model.User;

public interface CongeService {

	Conge saveConge(Conge conge);

	Collection<Conge> getConges(User user);

//	Conge getConge(long id);

}
