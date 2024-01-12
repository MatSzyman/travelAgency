package wat.wcy.TravelAgency.Logic;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page; //poprawny import
import org.springframework.data.domain.Pageable;

import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import wat.wcy.TravelAgency.DTO.CreateTravelDTO;
import wat.wcy.TravelAgency.DTO.TravelDTO;
import wat.wcy.TravelAgency.Repositories.CityRepository;
import wat.wcy.TravelAgency.Repositories.HotelRepository;
import wat.wcy.TravelAgency.Repositories.TravelRepository;
import wat.wcy.TravelAgency.model.City;
import wat.wcy.TravelAgency.model.Hotel;
import wat.wcy.TravelAgency.model.Travel;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
@EnableScheduling
@RequiredArgsConstructor
public class TravelService {
    private final TravelRepository travelRepository;
    private final HotelRepository hotelRepository;
    private final CityRepository cityRepository;

    public List<TravelDTO> getTravels(){
        return travelRepository.findAll().stream().map(TravelDTO::new).collect(Collectors.toList());
    }

    public Page<TravelDTO> getPageableTravels(Pageable pageable){
        Page<Travel> travelsEntities = travelRepository.findAll(pageable);
        return travelsEntities.map(travel -> new TravelDTO(
                travel.getId(),
                travel.getName(),
                travel.getBasePrice(),
                travel.getDescription(),
                travel.getStartSeason(),
                travel.getEndSeason(),
                travel.getHotel().getStarsCount(),
                travel.getHotel().getName(),
                travel.getCity().getName(),
                travel.getFileDataId()
        ));
    }

    public TravelDTO saveTravel(CreateTravelDTO source){
        Hotel hotel = hotelRepository.findById(source.getHotel())
                .orElseThrow(() -> new EntityNotFoundException("Hotel not found"));
        City city = cityRepository.findById(source.getCity())
                .orElseThrow(() -> new EntityNotFoundException("City not found"));

        Travel travel = new Travel(source.getName(), source.getBasePrice(), source.getDescription(), source.getStartSeason(), source.getEndSeason(), hotel, city);
        Travel savedTravel = travelRepository.save(travel);
        
        return new TravelDTO(savedTravel);
    }


    @Scheduled(cron = "0 0 0 * * ?") // odpala sie o 12 w nocy
    public void deleteTravel(){
        Instant today =  Instant.now();
        for(Travel travel: travelRepository.findAll()){
            if(travel.getEndSeason().equals(today)){
                travelRepository.delete(travel);
            }
        }
    }

}
