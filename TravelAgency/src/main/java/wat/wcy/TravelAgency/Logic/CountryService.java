package wat.wcy.TravelAgency.Logic;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import wat.wcy.TravelAgency.DTO.CountryDTO;
import wat.wcy.TravelAgency.Repositories.CountryRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CountryService {

    private final CountryRepository repository;
    private static final Logger logger = LoggerFactory.getLogger(ClientService.class);
    public CountryService(CountryRepository repository){
        this.repository = repository;
    }


    public List<CountryDTO> getCountries(){
        logger.warn("I GOT: " + repository.findAll().stream().map(CountryDTO::new).collect(Collectors.toList()));
       return repository.findAllWithCities().stream().map(CountryDTO::new).collect(Collectors.toList());
    }

    public boolean isCountry(String name){
        return repository.existsByName(name);
    }

    public CountryDTO getCountry(String name){
        var result = repository.findByName(name);
        return new CountryDTO(result);
    }



}
