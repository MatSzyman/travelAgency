package wat.wcy.TravelAgency.Logic;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import wat.wcy.TravelAgency.DTO.CreateTravelOptionDTO;
import wat.wcy.TravelAgency.DTO.TravelOptionDTO;
import wat.wcy.TravelAgency.Repositories.TravelOptionRepository;
import wat.wcy.TravelAgency.model.TravelOption;

import java.security.InvalidParameterException;
import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TravelOptionService {

    TravelOptionRepository travelOptionRepository;

    public TravelOptionService(TravelOptionRepository travelOptionRepository) {
        this.travelOptionRepository = travelOptionRepository;
    }

    public List<TravelOptionDTO> getTravelOptions(){
        return travelOptionRepository.findAll().stream().map(TravelOptionDTO::new).collect(Collectors.toList());
    }

    public TravelOptionDTO getTravelOptionById(Integer id){
        return travelOptionRepository.findById(id).map(TravelOptionDTO::new)
                .orElseThrow(()-> new EntityNotFoundException("Travel option not found with id: " + id));
    }

    public TravelOptionDTO saveTravelOption(CreateTravelOptionDTO source) throws InvalidParameterException {
        Instant startSeason = source.getTravel().getStartSeason();
        Instant endSeason = source.getTravel().getEndSeason();
        TravelOption result = source.toTravelOption();

        if (result.getArrivalTime().isBefore(startSeason) || result.getArrivalTime().isAfter(endSeason)) {
            throw new InvalidParameterException("Arrival time must be between the start and end of the season.");
        }

        if (result.getDepartureTime().isBefore(startSeason) || result.getDepartureTime().isAfter(endSeason)) {
            throw new InvalidParameterException("Departure time must be between the start and end of the season.");
        }

        return new TravelOptionDTO(travelOptionRepository.save(result));
    }


}
