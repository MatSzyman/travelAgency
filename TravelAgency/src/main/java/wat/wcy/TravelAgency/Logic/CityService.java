package wat.wcy.TravelAgency.Logic;

import org.springframework.stereotype.Service;
import wat.wcy.TravelAgency.DTO.CityDTO;
import wat.wcy.TravelAgency.Repositories.CityRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CityService {

    private final CityRepository repository;

    public CityService(CityRepository repository){
        this.repository = repository;
    }


    public List<CityDTO> getCities(String name){
        return repository.findAllByCountry_Name(name).stream().map(CityDTO::new).collect(Collectors.toList());
    }

    public List<CityDTO> getCities(){
        return repository.findAll().stream().map(CityDTO::new).collect(Collectors.toList());
    }


    public boolean isCity(int id){
        return repository.existsById(id);
    }

    public CityDTO getCity(String name){
        var reult = repository.findByName(name);
        return new CityDTO(reult);
    }
}
