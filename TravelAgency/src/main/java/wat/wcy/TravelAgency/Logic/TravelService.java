package wat.wcy.TravelAgency.Logic;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import wat.wcy.TravelAgency.DTO.TravelDTO;
import wat.wcy.TravelAgency.Repositories.TravelRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TravelService {
    private final TravelRepository travelRepository;

    public List<TravelDTO> getTravels(){
        return travelRepository.findAll().stream().map(TravelDTO::new).collect(Collectors.toList());
    }
}
