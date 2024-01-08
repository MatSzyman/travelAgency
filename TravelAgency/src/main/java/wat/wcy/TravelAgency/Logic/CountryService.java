package wat.wcy.TravelAgency.Logic;

import org.springframework.stereotype.Service;
import wat.wcy.TravelAgency.DTO.CountryDTO;
import wat.wcy.TravelAgency.Repositories.CountryRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CountryService {

    private final CountryRepository repository;

    public CountryService(CountryRepository repository){
        this.repository = repository;
    }


    public List<CountryDTO> getCountries(){
       return repository.findAll().stream().map(CountryDTO::new).collect(Collectors.toList());
    }

    public boolean isCountry(String name){
        return repository.existsByName(name);
    }

    public CountryDTO getCountry(String name){
        var result = repository.findByName(name);
        return new CountryDTO(result);
    }



}
