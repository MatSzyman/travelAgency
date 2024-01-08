package wat.wcy.TravelAgency.Logic;

import org.springframework.stereotype.Service;
import wat.wcy.TravelAgency.DTO.HotelDTO;
import wat.wcy.TravelAgency.Repositories.HotelRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class HotelService {

    private final  HotelRepository hotelRepository;

    public HotelService(HotelRepository hotelRepository) {
        this.hotelRepository = hotelRepository;
    }

    public List<HotelDTO> getHotels(){
        return hotelRepository.findAll().stream().map(HotelDTO::new).collect(Collectors.toList());

    }


}
