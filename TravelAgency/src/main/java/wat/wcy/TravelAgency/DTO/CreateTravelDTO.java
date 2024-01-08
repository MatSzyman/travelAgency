package wat.wcy.TravelAgency.DTO;

import lombok.Value;

import java.time.Instant;

@Value
public class CreateTravelDTO {

    String name;
    Double basePrice;
    String description;
    Instant startSeason;
    Instant endSeason;
    Integer hotel;
    Integer city;

/*    public Travel toTravel(){
        return new Travel(name,basePrice,description,startSeason,endSeason,hotelId);
    }*/


}
