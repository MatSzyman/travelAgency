package wat.wcy.TravelAgency.Logic;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

import java.rmi.NoSuchObjectException;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@EnableScheduling
@RequiredArgsConstructor
public class TravelService {
    private final TravelRepository travelRepository;
    private final HotelRepository hotelRepository;
    private final CityRepository cityRepository;
    private static final Logger logger = LoggerFactory.getLogger(TravelService.class);

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
                travel.getHotel().getPrice(),
                travel.getHotel().getDescription(),
                travel.getCity().getName(),
                travel.getFileDataId()
        ));
    }

    public Page<TravelDTO> getTravelsByCityNameIn(List<String> cityNames, Pageable pageable){
        return travelRepository.findByCityNameIn(cityNames, pageable)
                .map(TravelDTO::new);
    }

    public Page<TravelDTO> getFilteredTravels(
            Optional<List<String>> cityNames,
            Optional<Integer> starsCount,
            Optional<Double> maxPrice,
            Optional<Double> minPrice,
            Pageable pageable){
        return travelRepository
                .findByCityNameInAndOptionalHotelStarsCountAndMinHotelPriceAndMaxHotelPrice(
                        cityNames, starsCount, maxPrice, minPrice, pageable
                )
                .map(TravelDTO::new);
    }

    public TravelDTO saveTravel(CreateTravelDTO source){
        Hotel hotel = hotelRepository.findById(source.getHotel())
                .orElseThrow(() -> new EntityNotFoundException("Hotel not found"));
        City city = cityRepository.findById(source.getCity())
                .orElseThrow(() -> new EntityNotFoundException("City not found"));

        Travel travel = new Travel(source.getName(), source.getBasePrice(), source.getDescription(), source.getStartSeason(), source.getEndSeason(), hotel, city,source.getFileDataId());
        Travel savedTravel = travelRepository.save(travel);
        
        return new TravelDTO(savedTravel);
    }


    public void deleteById(Integer id) throws NoSuchObjectException {
        Optional<Travel> travelToDelete = travelRepository.findById(id);
        if (travelToDelete.isPresent()){
            travelRepository.deleteById(id);
        }else {
            throw new NoSuchObjectException("There is no travel with id: " + id);
        }

    }


    @Scheduled(cron = "0 0 0 * * ?") // odpala sie o 12 w nocy
    public void deleteTravelScheduled(){
        Instant today =  Instant.now();
        for(Travel travel: travelRepository.findAll()){
            if(travel.getEndSeason().equals(today)){
                travelRepository.delete(travel);
            }
        }
    }



}
